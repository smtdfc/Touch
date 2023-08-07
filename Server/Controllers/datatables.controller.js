const DatatablesService = require("../Services/Datatables/main.js")
const { generateErrorResponse } = require("../utils.js")

class DatatablesController {
  static async adminGetAllDT(request, reply) {
    if (!request.user) {
      return generateErrorResponse(reply, 403, "Permission Error", "Access has been blocked !")
    }

    try {
      let list = await DatatablesService.getAll(
        request.body.limit ?? 5,
        request.body.offset ?? 0
      )
      return reply.code(200).send({list})
    } catch (err) {
      return generateErrorResponse(reply, 400, err.name, err.message)
    }
  }
  
  static async create(request, reply) {
    if (!request.user) {
      return generateErrorResponse(reply, 403, "Permission Error", "Access has been blocked !")
    }
  
    try {
      let info = await DatatablesService.create(
        request.user.user_id,
        request.body.name ?? "Untitled"
      )
      return reply.code(200).send({ info })
    } catch (err) {
      return generateErrorResponse(reply, 400, err.name, err.message)
    }
  }
}

module.exports = DatatablesController