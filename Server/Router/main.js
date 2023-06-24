const listRoute = [
	require("./info.js"),
	require("./auth.js"),
	require("./test.js")
]


module.exports = function(instance){
	listRoute.forEach((route)=>{
		route(instance)
	})
}