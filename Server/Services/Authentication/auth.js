const TokenService = require("./token.js")
module.exports = class AuthService {
  static async userObj(user_id){
    
  }
  
  static async role(user_id){
    let user = await models.Users.findOne({
      where: {
        user_id: user_id
      },
      attributes:["role"],
      raw: true
    })

    if (!user) {
      throw {
        name: "Auth Error",
        message: "Incorrect username or password !"
      }
    } else {
      if (user.status == "lock") {
        throw {
          name: "Auth Error",
          message: "Account has been locked  !"
        }
      }
    }
    return user.role

  }
  static async info(user_id) {
    let user = await models.Users.findOne({
      where: {
        user_id: user_id
      },
      raw: true
    })

    if (!user) {
      throw {
        name: "Auth Error",
        message: "Incorrect username or password !"
      }
    } else {
      if (user.status == "lock") {
        throw {
          name: "Auth Error",
          message: "Account has been locked  !"
        }
      }

      return {
        id: user.user_id,
        name: user.name,
        status: user.status,
        group_id: user.group_id,
        role: user.role,
      }

    }
  }

  static async login(username, password, info) {
    if (!username || !password || !info) {
      throw {
        name: "Auth Error",
        message: "Missing auth information !"
      }
    }

    let user = await models.Users.findOne({
      where: {
        name: username,
        password: password
      },
      raw: true
    })

    if (!user) {
      throw {
        name: "Auth Error",
        message: "Incorrect username or password !"
      }
    } else {
      if (user.status == "lock") {
        throw {
          name: "Auth Error",
          message: "Account has been locked  !"
        }
      }

      let tokens = {
        accessToken: await TokenService.generate({
          type: "access_token",
          user_id: user.user_id
        }, process.env.ACCESSTOKEN_SECRET, "1h"),
        refreshToken: await TokenService.generate({
          type: "refresh_token",
          user_id: user.user_id
        }, process.env.REFRESHTOKEN_SECRET, "1d"),
      }

      await models.LoginHistory.create({
        user_id: user.user_id,
        token: tokens.refreshToken,
        info: JSON.stringify(info)
      })

      return {
        id: user.user_id,
        name: user.name,
        status: user.status,
        group_id: user.group_id,
        role: user.role,
        tokens
      }

    }
  }

  static async newToken(refreshToken) {
    let token = await models.LoginHistory.findOne({
      where: {
        token: refreshToken
      }
    })

    if (!token) {
      throw {
        name: "Token Error",
        message: "The token is incorrect or has expired !"
      }
    } else {
      let info = await TokenService.verify(refreshToken, process.env.REFRESHTOKEN_SECRET)
      let tokens = {
        accessToken: await TokenService.generate({
          type: "access_token",
          user_id: info.user_id
        }, process.env.ACCESSTOKEN_SECRET, "1h"),
        refreshToken:refreshToken
      }
 
      return {tokens}
    }
  }
  
  static async logout(user_id,refreshToken){
    let session = await models.LoginHistory.findOne({
      where: {
        user_id:user_id,
        token: refreshToken
      }
    })
    
    if (!session) {
      throw {
        name: "Auth Error",
        message: "Login session does not exist  !"
      }
    } else {
      await session.destroy()
      return {user_id}
    }
  }
}