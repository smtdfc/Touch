const TokenService = require("./token.js")
const {generateErrResponse} = require("../../utils.js")

module.exports = async function (request, reply) {
  request.user = null
  if(request.headers["authorization"]){
    let token = request.headers["authorization"].split(" ")[1]
    if(token){
      try {
        let info = await TokenService.verify(token, process.env.ACCESSTOKEN_SECRET)
        request.user = info
        try {
        	let user = await AuthService.user(request.user.user_id)
        	request.user.role = user.role
        	request.user._user = user
        } catch (err) {
        	return generateErrResponse(reply, err)
        }
      } catch (err) {
        return generateErrResponse(reply,err)
      }
    }
  }
}