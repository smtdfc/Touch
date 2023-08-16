const configs = require("../config.js")
const AuthController = require("../Controllers/auth.controller.js")
const DTController = require("../Controllers/DT.controller.js")
const AuthService = require("../Services/Authentication/auth.js")
const { generateErrResponse, generateSuccessResponse } = require("../utils.js")

function getUser() {
  return {
    preHandler: async function(request, reply) {
      if (!request.user) {
        return generateErrResponse(reply, {
          name: "Permission Error",
          message: "Access has been blocked !"
        })
      }
      try {
        let user = await AuthService.user(request.user.user_id)
        request.user.role = user.role
        request.user._user = user
      } catch (err) {
        return generateErrResponse(reply, err)
      }
    }
  }
}

module.exports = function(fastify) {
  fastify.post(`/api/v${configs.ver}/auth/login`, AuthController.login)
  fastify.post(`/api/v${configs.ver}/auth/info`, AuthController.info)
  fastify.post(`/api/v${configs.ver}/auth/token`, AuthController.token)
  fastify.post(`/api/v${configs.ver}/auth/logout`, AuthController.logout)
  fastify.post(`/api/v${configs.ver}/datatables/list`, getUser(), DTController.list)
  fastify.post(`/api/v${configs.ver}/datatables/create`, getUser(), DTController.create)
  fastify.post(`/api/v${configs.ver}/datatables/remove`, getUser(), DTController.remove)
  fastify.post(`/api/v${configs.ver}/datatables/info`, getUser(), DTController.info)
    fastify.post(`/api/v${configs.ver}/datatables/owners`, getUser(), DTController.owners)

}