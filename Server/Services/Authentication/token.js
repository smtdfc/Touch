const jwt = require("jsonwebtoken")
class TokenService {
  static generate(payload, secret, expiresIn) {
    return jwt.sign(payload, secret, {
      expiresIn: expiresIn
    })
  }

  static verify(token, secret) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          reject({
            name:"Token Error",
            message:"Invalid or expired token !"
          })
        }
        resolve(decoded)
      });
    })
  }

}
module.exports = TokenService