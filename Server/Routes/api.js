const configs = require("../config.js")
const AuthService = require("../Controllers/auth.controller.js")

module.exports = function(fastify) {
  fastify.post(`/api/${configs.ver}/auth/login`, AuthService.login)
  fastify.post(`/api/${configs.ver}/auth/info`, AuthService.info)
  fastify.post(`/api/${configs.ver}/auth/token`, AuthService.token)
  fastify.post(`/api/${configs.ver}/auth/logout`, AuthService.logout)
}