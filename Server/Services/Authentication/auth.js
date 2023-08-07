const TokenService = require("./token.js")
class AuthService {

  static async login(username, password, info) {
    if (!info || !username || !password) {
      throw {
        name: "Auth Error",
        message: "Missing login information !"
      }
    }

    let user = await models.Users.findOne({
      where: {
        name: username
      }
    })
    if (!user) {
      throw {
        name: "Auth Error",
        message: "Incorrect username or password "
      }
    } else {
      if (password != user.password) {
        throw {
          name: "Auth Error",
          message: "Incorrect username or password "
        }
      }

      if (user.status == "lock") {
        throw {
          name: "Auth Error",
          message: "Account has been locked ! "
        }
      }

      let tokens = {
        accessToken: null,
        refreshToken: null
      }

      tokens.accessToken = await TokenService.generate({
        type: "access token",
        user_id: user.user_id
      }, process.env.ACCESSTOKEN_SECRET, "1h")

      tokens.refreshToken = await TokenService.generate({
        type: "refresh token",
        user_id: user.user_id
      }, process.env.REFRESHTOKEN_SECRET, "1d")

      await models.LoginHistory.create({
        token: tokens.refreshToken,
        info: JSON.stringify(info),
        loginAt: Date.now()
      })

      return {
        id: user.user_id,
        name: user.name,
        status: user.status,
        role: user.role,
        group: user.group_id,
        tokens: tokens
      }
    }
  }

  static async getInfo(user_id) {
    let user = await models.Users.findOne({
      where: {
        user_id: user_id
      }
    })
    if (!user) {
      throw {
        name: "Auth Error",
        message: "User does not exist ! "
      }
    } else {
      if (user.status == "lock") {
        throw {
          name: "Auth Error",
          message: "Account has been locked ! "
        }
      }
      return {
        id: user.user_id,
        name: user.name,
        status: user.status,
        role: user.role,
        group: user.group_id,
      }
    }
  }

  static async getNewToken(refreshToken) {
    if (!refreshToken) {
      throw {
        name: "Auth Error",
        message: "Missing auth information !"
      }
    }

    let token = await models.LoginHistory.findOne({
      where: {
        token: refreshToken
      },
      attributes: ["token"]
    })
    if (!token) {
      throw {
        name: "Auth Error",
        message: "Token Error !"
      }
    } else {
      let payload = await TokenService.verify(token, process.env.REFRESHTOKEN_SECRET)
      let user_id = payload.user_id
      let tokens = {
        accessToken: null,
        refreshToken: refreshToken
      }

      tokens.accessToken = await TokenService.generate({
        type: "access token",
        user_id: user_id
      }, process.env.ACCESSTOKEN_SECRET, "1h")
      return tokens
    }
  }

  static getUserStatus(user_id) {

  }

  static logout(user_id, refresh_token) {
    await models.LoginHistory.destroy({
      where: {
        token: tokens.refreshToken
      }
    })
  }

}

module.exports = AuthService