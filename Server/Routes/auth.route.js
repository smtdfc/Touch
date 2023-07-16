const AuthController = require("../Controllers/auth.controller.js")
module.exports = function(fastify){
	fastify.post("/api/v1/auth/login",AuthController.login)
	fastify.post("/api/v1/auth/info",AuthController.getInfo)
	fastify.post("/api/v1/auth/logout",AuthController.logout)
	fastify.post("/api/v1/auth/getNewToken",AuthController.newToken)
}