const AuthService = require("../Authentication/auth.js")
const DatatableIOService = require("../Datatables/io.js")
const { verify } = require("../Authentication/token.js")

module.exports = function(fastify) {
  console.log("Init WebSocket Protocol ...")
  fastify.ready().then(() => {
    fastify.io.on("connection", function(socket) {
      socket.data.auth = null
      socket.data.listeners = []
      socket.on("auth", async function(data) {
        let accessToken = data.accessToken
        try {
          let user = await verify(accessToken, process.env.ACCESSTOKEN_SECRET)
          socket.data.auth = user
          socket.emit("auth:success")
        } catch (err) {
          socket.emit("auth:err", err)
        }
      })

      socket.on("listener:add", async function(data) {
        let dt_id = data.dt_id
        if (!socket.data.auth) {
          socket.emit("add-listener err", {
            name: "Auth Error",
            message: "Unauthorized !"
          })
        } else {
          let role = await AuthService.getUserRole(socket.data.auth.user_id)
          if (role == "admin") {
            socket.data.listeners.push(dt_id)
            socket.emit("add-listener success", {
              dt_id: dt_id,
              fields:await DatatableIOService.getAllFieldName(dt_id)
            })
            socket.join(dt_id)
          } else {
            socket.emit("add-listener err", {
              name: "Permission Error",
              message: "Access has been blocked !"
            })
          }
        }
      })

      socket.on("listener:remove", async function(data) {
        let dt_id = data.dt_id
        if (!socket.data.auth) {
          socket.emit("remove-listener err", {
            name: "Auth Error",
            message: "Unauthorized !"
          })
        } else {
          let role = await AuthService.getUserRole(socket.data.auth.user_id)
          if (role == "admin") {
            socket.data.listeners = socket.data.listeners.filter(id => id != dt_id)
            socket.emit("remove-listener success", {
              dt_id: dt_id
            })
            socket.leave(dt_id)
          } else {
            socket.emit("remove-listener err", {
              name: "Permission Error",
              message: "Access has been blocked !"
            })
          }
        }
      })
      
      socket.on("get dt",async function (data) {
        let dt_id = data.dt_id
        if (!socket.data.auth) {
          socket.emit("get-dt err", {
            name: "Auth Error",
            message: "Unauthorized !"
          })
        } else {
          if (socket.data.listeners.includes(dt_id)) {
            try {
              let res = await DatatableIOService.getData(
                dt_id,
                data.limit ?? 5,
                data.offset ?? 0
              )
              
              socket.emit(`set_${dt_id}`,{
                dt_id:dt_id,
                data:res
              })
              
            } catch (err) {
              socket.emit("get-dt err", err)
            }
          } else {
            socket.emit("get-dt err", {
              name: "Permission Error",
              message: "Access has been blocked !"
            })
          }
        }
      })
      
      socket.on("get field", async function(data) {
        let dt_id = data.dt_id
        if (!socket.data.auth) {
          socket.emit("get-field err", {
            name: "Auth Error",
            message: "Unauthorized !"
          })
        } else {
          if (socket.data.listeners.includes(dt_id)) {
            try {
              let res = await DatatableIOService.getAllFieldName(
                dt_id,
              )
      
              socket.emit(`field_${dt_id}`, {
                dt_id: dt_id,
                data: res
              })
      
            } catch (err) {
              socket.emit("get-field err", err)
            }
          } else {
            socket.emit("get-field err", {
              name: "Permission Error",
              message: "Access has been blocked !"
            })
          }
        }
      })
      
      socket.on("set dt", async function(data) {
        let dt_id = data.dt_id
        if (!socket.data.auth) {
          socket.emit("set-dt err", {
            name: "Auth Error",
            message: "Unauthorized !"
          })
        } else {
          if (socket.data.listeners.includes(dt_id)) {
            try {
              await DatatableIOService.setData(
                dt_id,
                data.field,
                data.value
              )
              fastify.io.to(dt_id).emit(`set_${dt_id}`, {
                dt_id,
                field: data.field,
                value: data.value
              })
            } catch (err) {
              socket.emit("set-dt err", err)
            }
          } else {
            socket.emit("set-dt err", {
              name: "Permission Error",
              message: "Access has been blocked !"
            })
          }
        }
      })

    })
  })
}