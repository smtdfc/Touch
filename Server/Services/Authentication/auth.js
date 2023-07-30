const TokenService = require("./token.js")
class AuthService {

  static async login(username, password) {
    let user = await models.Users.findOne({
      where: {
        name: username
      }
    })
    if(!user){
      throw {
        name:"Auth Error",
        message:"Incorrect username or password "
      }
    }else{
      if(password != user.password){
        throw {
          name: "Auth Error",
          message: "Incorrect username or password "
        }
      }
      
      if(user.status == "lock"){
        throw {
          name: "Auth Error",
          message: "Account has been locked ! "
        }
      }
      
      return {
        id:user.user_id,
        name:user.name,
        status:user.status,
        role:user.role,
        group:user.group_id
      }
    }
  }

  static getUserStatus(user_id) {

  }

  static logout(user_id, refresh_token) {

  }

}

module.exports = AuthService