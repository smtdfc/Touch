const configs = require("../config.js")
const AuthController = require("../Controllers/auth.controller.js")
const DTController = require("../Controllers/DT.controller.js")
const AuthService = require("../Services/Authentication/auth.js")
const {generateErrResponse,generateSuccessResponse} = require("../utils.js")

function getRole(){
  return {
    preHandler: async function(request, reply) {
      if (!request.user) {
        return generateErrResponse(reply, {
          name:"Permission Error", 
          message:"Access has been blocked !"
        })
      }
      try {
        let role = await AuthService.role(request.user.user_id)
        request.user.role = role
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
  fastify.post(`/api/v${configs.ver}/datatables/list`,getRole(),DTController.list)
  fastify.post(`/api/v${configs.ver}/datatables/create`,DTController.create)

}