module.exports = function(fastify) {
	fastify.get("/api/v1/info",function(request, reply){
		return reply.code(200).send({
			version:"0.0.1",
			timestamp:Date.now(),
			isActive:true
		})
	})
}