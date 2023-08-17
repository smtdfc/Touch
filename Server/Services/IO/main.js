const AuthService = require("../Authentication/auth.js")
const TokenService = require("../Authentication/token.js")
const DatatablesService = require("../DataTables/main.js")

module.exports = function(fastify) {
  fastify.ready().then(() => {
    fastify.io.on("connection", function(socket) {
      socket.data = {
        auth: null,
        listening: [],
        type: "listen_data_dt"
      }

      socket.on("dt:set_listener", async function(data) {
        if (!data.accessToken) {
          socket.emit("auth_err", {
            name: "Auth Error",
            message: "Missing auth information !"
          })
          return
        }

        //Authentication 
        try {
          socket.data.auth = await TokenService.verify(
            data.accessToken,
            process.env.ACCESSTOKEN_SECRET
          )
          socket.data.auth.info = await AuthService.user(socket.data.auth.user_id)
        } catch (err) {
          socket.emit("auth_err", err)
          return
        }

        let role = socket.data.auth.info.role
        let accessLevel = 0
        let dt = null

        if (role == "admin") {
          try {
            let dt = await DatatablesService.getDT(
              data.dt_id,
              3
            )
          } catch (err) {
            socket.emit("action_err", {
              name: "Action Error",
              message: "You do not have access to this datatables "
            })
            return
          }
          accessLevel = 3
          socket.join(`dt_${data.dt_id}`)
          socket.data.listening.push(data.dt_id)
          socket.emit("dt:set_listener:success", {
            dt_id: data.dt_id
          })
          return
        } else {
          try {
            let res = await DatatablesService.isOwner(
              data.dt_id,
              socket.info.auth.user_id
            )
            if (res[0]) {
              if (res[1] == "creator") {
                accessLevel = 2
              } else {
                accessLevel = 1
              }

              socket.join(`dt_${data.dt_id}`)
              socket.data.listening.push(data.dt_id)
              socket.emit("dt:set_listener:success", {
                dt_id: data.dt_id
              })
              return
            } else {
              socket.emit("action_err", {
                name: "Action Error",
                message: "You do not have access to this datatables "
              })
              return
            }
          } catch (err) {
            socket.emit("action_err", err)
            return
          }
        }
      })
      socket.on("dt:rm_listener",async function(data){
        if(!socket.data.auth){
          socket.emit("auth_err",{
            name:"Auth Error",
            message:"Unauthorized !"
          })
          return 
        }
        
        if(socket.data.listening.includes(data.dt_id)){
          socket.leave(`dt_${data.dt_id}`)
          socket.data.listening = socket.data.listening.filter(v => v==data.dt_id)
        }else{
          socket.emit("action_err", {
            name: "Action Error",
            message: "Cannot remove listener of Datatable !"
          })
        }
      })
      
      
    })
  })
}