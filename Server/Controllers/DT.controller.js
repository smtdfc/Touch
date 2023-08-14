const DTService = require("../Services/DataTables/main.js")
const AuthService = require("../Services/Authentication/auth.js")
const { generateErrResponse, generateSuccessResponse } = require("../utils.js")

module.exports = class DTController {
  static async list(request, reply) {
    if (!request.user) {
      return generateErrResponse(reply, {
        name: "Permission Error",
        message: "Access has been blocked !"
      })
    }

    if (request.user.role == "admin") {
      try {
        let list = await DTService.getAll(
          request.body.limit??5,
          request.body.offset??0
        )
        return generateSuccessResponse(reply,list)
      } catch (err) {
        return generateErrResponse(reply, err)
      }
    }

    if (request.user.role == "user") {
      try {
        let list = await DTService.getByOwners(
          request.user.user_id,
          request.body.limit??5,
          request.body.offset??0
        )
        return generateSuccessResponse(reply,list)

      } catch (err) {
        return generateErrResponse(reply, err)
      }
    }

  }
  
  static async create(request, reply) {
    if (!request.user) {
      return generateErrResponse(reply, {
        name: "Permission Error",
        message: "Access has been blocked !"
      })
    }
    
    try {
      let info = await DTService.create(
        request.user._user,
        request.body.name ?? "no name",
      )
      return generateSuccessResponse(reply,info)
    } catch (err) {
      return generateErrResponse(reply, err)
    }
    
  }

}