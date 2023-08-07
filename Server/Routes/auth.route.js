const AuthController = require("../Controllers/auth.controller.js")
module.exports = function(fastify){
  fastify.post('/api/v1/auth/login',AuthController.login )
  fastify.post('/api/v1/auth/info',AuthController.info )
  fastify.post('/api/v1/auth/token',AuthController.token )
  fastify.post("/api/v1/auth/logout",AuthController.logout)
}
