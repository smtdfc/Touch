const AuthService = require("../Services/Authentication/auth.js")
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
            socket.emit("add-listener success",{
              dt_id:dt_id
            })
          } else {
            socket.emit("add-listener err",  {
              name: "Permission Error",
              message: "Access has been blocked !"
            })
          }
        }
      })
      
      
    })
  })
}