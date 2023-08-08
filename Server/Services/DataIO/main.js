const {verify} = require("../Authentication/token.js")
module.exports = function(fastify ){
  console.log("Init WebSocket Protocol ...")
  fastify.ready().then(() => {
  fastify.io.on("connection",function(socket){
    socket.auth = null
    socket.on("auth",async function(data){
      let accessToken = data.accessToken
      try {
        let user = await verify(accessToken)
        socket.auth = user
        socket.emit("auth:success")
      } catch (err) {
        socket.emit("auth:err",err)
      }
    })
  })
  })
}