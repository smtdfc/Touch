const jwt = require("jsonwebtoken")
class TokenService{
  static generate(payload,secret, expiresIn){
    return jwt.sign(payload,secret,{
      expiresIn:expiresIn
    })
  }
  
  static verify(token,secret){
    
  }
  
}
module.exports = TokenService