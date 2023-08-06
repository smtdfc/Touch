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
  
  static async info(request, reply) {
    if(!request.user){
      return generateErrorResponse(reply, 403, "Permission Error", "Access has been blocked !" )
    }
    
    try {
      let info = await AuthService.getInfo(
        request.user.user_id
      )
      return reply.code(200).send({ info })
    } catch (err) {
      return generateErrorResponse(reply, 400, err.name, err.message)
    }
  }
  
  static async token(request, reply) {
    if (!request.user) {
      return generateErrorResponse(reply, 403, "Permission Error", "Access has been blocked !")
    }
  
    try {
      let tokens = await AuthService.getNewToken(
        request.body.refreshToken
      )
      return reply.code(200).send({ tokens })
    } catch (err) {
      return generateErrorResponse(reply, 400, err.name, err.message)
    }
  }
}

module.exports = AuthController