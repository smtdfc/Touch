const AuthService = require("../Services/Authentication/auth.js")
const {generateErrorResponse} = require("../utils.js")

class AuthController {
  static async login(request,reply){
    try {
      let info = await AuthService.login(
        request.body.username,
        request.body.password,
        request.body.info
      )
      return reply.code(200).send({info})
    } catch (err) {
      return generateErrorResponse(reply,400,err.name,err.message)
    }
  }
}

module.exports = AuthController