const routes =[
	require("./auth.route.js"),
	require("./info.route.js")
]

module.exports = function(fastify){
	routes.forEach((route)=>{
		route(fastify)
	})
}