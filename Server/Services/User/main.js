const TouchUser = require("../../Classes/User.js")

module.exports = class UserService{
  static async getUserByName(username){
    let user = models.Users.findOne({
      where:{
        username:username
      }
    })
    
    if(!user){
      throw {
        name:"Action Error",
        message:"User doesn't exist !"
      }
    }else{
      return new TouchUser(user)
    }
  }
}