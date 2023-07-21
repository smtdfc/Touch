const jwt = require("jsonwebtoken")
const TokenModel = global.models.TokenModel
async function generateRefreshToken(userInfo, clientInfo) {
  let token = jwt.sign({ user: userInfo, date: Date.now() }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "10d" })
  await TokenModel.create({
    userID: userInfo.userID,
    token: token,
    info: JSON.stringify(clientInfo),
    status: "active"
  })
  return token
}

function generateAccessToken(userInfo) {
  let token = jwt.sign({ user: userInfo, date: Date.now() }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
  return token
}

async function verifyRefreshToken(token) {
  let result = await TokenModel.findOne({
    where: {
      token: token
    }
  })
  if (!result) {
    throw {
      name: "Token Error",
      message: "Invalid token"
    }
  } else {
    try {
      let result = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
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
}

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

async function removeRefreshToken(token) {
  await TokenModel.destroy({
    where: {
      token: token
    }
  })
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  removeRefreshToken
}