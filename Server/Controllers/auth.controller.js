const AuthService = require("../Services/Authentication/auth.js")
const {generateErrResponse,generateSuccessResponse} = require("../utils.js")

module.exports = class AuthController{
  
  static async login(request,reply){
    try {
      let username = request.body.username
      let password = request.body.password
      let info = request.body.info
      let result = await AuthService.login(username,password,info)
      return generateSuccessResponse(reply,200,result)
    } catch (err) {
      return generateErrResponse(reply,400,err)
    }
  }
  
  static async token(request,reply){
    try {
      let result = await AuthService.token(request.body.refreshToken)
      return generateSuccessResponse(reply, 200, result)
    } catch (err) {
      return generateErrResponse(reply, 400, err)
    }
  }
  
  static async info(request,reply){
    if (!request.user) {
      return generateErrResponse(reply,403,{
        name:"Permission Error",
        message:"Access has been blocked !"
      })
    }
    try {
      let result = await AuthService.info(request.user.user_id)
      return generateSuccessResponse(reply, 200, result)
    } catch (err) {
      return generateErrResponse(reply, 400, err)
    }
  }
  
  static async logout (request, reply) {
    if (!request.user) {
      return generateErrResponse(reply, 403, {
        name: "Permission Error",
        message: "Access has been blocked !"
      })
    }
    
    try {
      let result = await AuthService.logout(request.user.user_id,request.refreshToken)
      return generateSuccessResponse(reply, 200, result)
    } catch (err) {
      return generateErrResponse(reply, 400, err)
    }
  }
}