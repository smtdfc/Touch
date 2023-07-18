const jwt = require("jsonwebtoken")
const {generateErrorResponse} = require("../../utils.js")

function verifyAccessToken(token) {
  try {
    let result = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    return result.user
  } catch (err) {
    if (err.message == "invalid token") {
      throw {
        name: "Token Error",
        message: "Invalid token"
      }
    } else if (err.message == "jwt expired") {
      throw {
        name: "Token Error",
        message: "Token expired"
      }
    } else {
      throw {
        name: "Token Error"
      }
    }
  }
}

module.exports = function(req, res, done) {
  let raw = req.headers["authorization"] || ""
  let authorization = raw.split(" ")[1] || null
  if (!authorization) {
    done()
  } else {
    try {
      let result = verifyAccessToken(authorization)
      req.user = result
      done()
    } catch (err) {
       return generateErrorResponse(res,401,err.name,err.message)
    }
  }
}