const jwt = require("jsonwebtoken")
class TokenService{
  static generate(payload,secret, expired){
    return jwt.sign(payload,secret,{
      expired:expired
    })
  }
  
  static verify(token,secret){
    
  }
  
}
module.exports = TokenService