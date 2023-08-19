const jwt = require("jsonwebtoken")

module.exports = class TokenService{
  static async generate(payload,secret,exp){
    return jwt.sign(payload,secret,{
      expiresIn:exp
    })
  }
  
  static verify(token,secret){
    return new Promise(function(resolve, reject ){
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          reject({
            name:"Token Error",
            message:"The token is incorrect or has expired !"
          })
        }else{
          resolve(decoded)
        }
      });
    })
  }
}