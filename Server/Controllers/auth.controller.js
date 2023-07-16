class AuthController{
	static async login(request,reply){
		return reply.code(200).send({})
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