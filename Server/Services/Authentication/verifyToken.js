const {verify} = require("./token.js")
const {generateErrorResponse} = require("../../utils.js")
module.exports = async function(req,res,done){
  req.user = null
  let authorization = req.headers["authorization"]
  if(authorization){
    let raw = authorization.split(" ")[1]
    try {
      req.user = await verify(raw,process.env.ACCESSTOKEN_SECRET)
      done()
    } catch (err) {
      return generateErrorResponse(res,403,err.name,err.message)
    }
  }
}

