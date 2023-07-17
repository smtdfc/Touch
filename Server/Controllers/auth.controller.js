const Auth = require("../Services/Authentication/auth.js")
const Token = require("../Services/Authentication/token.js")
const { generateErrorResponse } = require("../utils.js")
class AuthController {
  static async login(request, reply) {
    let body = request.body
    let clientInfo = {
      device: {
        browser: {
          userAgent: body.device.browser.userAgent,
          name: body.device.browser.name
        },
        ip: "unknown"
      }
    }

    let ips = request.ips || []
    if (ips.length > 0) {
      clientInfo.device.ip = ips[ips.length - 1]
    }

    try {
      let info = await Auth.login(body.username, body.password)
      let userInfo = {
        userID: info.userID,
        name: info.name,
        role: info.role
      }
      let accessToken = Token.generateAccessToken(userInfo)
      let refreshToken = await Token.generateRefreshToken(userInfo, clientInfo)
      userInfo.status = info.status
      return reply.code(200).send({
        info: info,
        tokens: {
          accessToken,
          refreshToken
        }
      })
    } catch (err) {
      return generateErrorResponse(res, 400, err.name, err.message)
    }
  }

  static async getInfo(request, reply) {
    if (!req.user) {
      return generateErrorResponse(reply, 403, "Permission Error", "Access has been blocked ")
    }
    return reply.code(200).send({ info: user })
  }

  static async logout(request, reply) {
    if (!req.user) {
      return generateErrorResponse(reply, 403, "Permission Error", "Access has been blocked ")
    }
    try {
      await Token.removeRefreshToken(request.body.refreshToken)
    } catch (err) {
      return generateErrorResponse(reply, 400, "Action Error", "Can not executive ")
    }
    return reply.code(200).send({})
  }

  static async newToken(request, reply) {
    try{
      if(!request.body.refreshToken){
        throw{
          name:"Token Error",
          message:"Invalid token"
        }
      }
      let info = await Token.verifyRefreshToken(request.body.refreshToken)
      let accessToken = await Token.generateAccessToken(info)
      return reply.code(200).send({
        tokens:{
          accessToken,
          refreshToken:request.body.refreshToken
        }
      })
    }catch(err){
      return generateErrorResponse(reply, 400, err.name,err.message)
    }
  }
}

module.exports = AuthController