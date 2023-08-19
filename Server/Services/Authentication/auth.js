const TokenService = require("./token.js")
const TouchUser = require("../../Classes/User.js")

module.exports = class AuthService {
  static async login(username, password ){
    let user = await models.Users.findOne({
      where:{
        username:username,
        password:password
      },
      raw:true
    })
    
    if(!user){
      
        
    }
  }
  
}