const Auth = require("../Services/Authentication/auth.js")
class AuthController{
	static async login(request,reply){
		let body = request.body
		console.log(request.ips);
		try {
			let info = await Auth.login(body.username,body.password)
return reply.code(200).send({
				info:info,
				tokens:{}
			})
		} catch (e) {
			return reply.code(400).send({
				error:e
			})
		}
		
	}
	static async getInfo(request, reply) {
		return reply.code(200).send({})
	}
	static async logout(request, reply) {
		return reply.code(200).send({})
	}
	static async newToken(request, reply) {
		return reply.code(200).send({})
	}
}

module.exports = AuthController