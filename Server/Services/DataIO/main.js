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

      socket.on("add_listener", async function(data) {
        let dt_id = data.dt_id
        if (!socket.data.auth) {
          socket.emit("add_listener:error", {
            name: "Auth Err",
            message: "Unauthorized !"
          })
        } else {
          let role = await AuthService.getUserRole(socket.auth.user_id)
          if (role == "admin") {
            socket.data.listeners.push(dt_id)
            socket.join(dt_id)
            socket.emit("add_listener:success", {
              dt_id
            })
          }
        }
      })
      socket.on("remove_listener", async function(data) {
        let dt_id = data.dt_id
        if (!socket.data.auth) {
          socket.emit("remove_listener:error", {
            name: "Auth Err",
            message: "Unauthorized !"
          })
        } else {
          let role = await AuthService.getUserRole(socket.auth.user_id)
          if (role == "admin") {
            socket.data.listeners = socket.data.listeners.filter(n=> n!=dt_id)
            socket.leave(dt_id)
            socket.emit("remove_listener:success", {
              dt_id
            })
          }
        }
      })
      socket.on("get_dt_data", async function(data) {
        let dt_id = data.dt_id
        if (!socket.data.auth) {
          socket.emit("get_dt_data:error", {
            name: "Auth Err",
            message: "Unauthorized !"
          })
        } else {
          let role = await AuthService.getUserRole(socket.auth.user_id)
          if (role == "admin") {
            if (socket.data.listeners.includes(dt_id)) {
              let list = await DatatableIOService.getData(
                dt_id,
                data.limit ?? 5,
                data.offset ?? 0
              )
              
              socket.emit("get_dt_data:success",{
                dt_id:dt_id,
                data:list
              })
            }
          }
        }

      })
      socket.on("set_dt_data", async function(data) {
        let dt_id = data.dt_id
        if (!socket.data.auth) {
          socket.emit("set_dt_data:error", {
            name: "Auth Err",
            message: "Unauthorized !"
          })
        } else {
          let role = await AuthService.getUserRole(socket.auth.user_id)
          if (role == "admin") {
            if (socket.data.listeners.includes(dt_id)) {
             await DatatableIOService.setData(
                dt_id,
                JSON.stringify(data.value ?? {})
              )
              
              fastify.io.to(dt_id).emit(`set_${dt_id}`,{
                dt_id:dt_id,
                value:JSON.stringify(data.value ?? {})
              })
            }
          }
        }
      })

    })
  })
}