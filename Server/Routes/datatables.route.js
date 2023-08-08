const DatatablesController = require("../Controllers/datatables.controller.js")
const AuthService = require("../Services/Authentication/auth.js")
const { generateErrorResponse } = require("../utils.js")

function isAdmin() {
  return {
    preHandler: async function(request, reply) {
      if (!request.user) {
        return generateErrorResponse(reply, 403, "Permission Error", "Access has been blocked !")
      }
      try {
        let role = await AuthService.getUserRole(request.user.user_id)
        if (role == "admin") {
          return
        } else {
          throw {
            name: "Permission Error",
            message: "Access has been blocked !"
          }
        }
      } catch (err) {
        return generateErrorResponse(reply, 400, err.name, err.message)
      }
    }
  }
}

module.exports = function(fastify) {
  fastify.post("/api/v1/admin/dt/list", isAdmin(), DatatablesController.adminGetAllDT)
  fastify.post("/api/v1/admin/dt/remove", isAdmin(), DatatablesController.adminRemoveDT)
    fastify.post("/api/v1/admin/dt/info", isAdmin(), DatatablesController.adminGetInfoDT)

  fastify.post("/api/v1/admin/dt/create", DatatablesController.create)
}