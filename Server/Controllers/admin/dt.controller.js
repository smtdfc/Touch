const DTManager = require("../../Services/DataTable/main.js")
const { generateErrorResponse } = require("../../utils.js")

class DTController {
  static async getAll(request, reply) {
    if (!request.user && request.user.role == "admin") {
      return generateErrorResponse(reply, 403, "Permission Error", "Access has been blocked ")
    }

    try {
      let body = request.body
      let limit = body.limit ?? 0
      let offset = body.offset ?? 0
      let list = await DTManager.getAllDT(limit, offset)
      return reply.code(200).send({ list: list })
    } catch (err) {
      return generateErrorResponse(reply, 400, err.name, err.message)
    }
  }

  static async getList(request, reply) {
    if (!request.user && request.user.role == "admin") {
      return generateErrorResponse(reply, 403, "Permission Error", "Access has been blocked ")
    }

    try {
      let body = request.body
      let limit = body.limit
      let offset = body.offset
      let list = await DTManager.getList(request.user.userID, limit, offset)
      return reply.code(200).send({ list: list })
    } catch (err) {
      return generateErrorResponse(reply, 400, err.name, err.message)
    }

  }


  static async create(request, reply) {
    if (!request.user && request.user.role == "admin") {
      return generateErrorResponse(reply, 403, "Permission Error", "Access has been blocked ")
    }
    try {
      let body = request.body
      let info = await DTManager.createDT(body.name, request.user.userID)
      return reply.code(200).send({ info: info })
    } catch (err) {
      return generateErrorResponse(reply, 400, err.name, err.message)
    }
  }
}

module.exports = DTController