const listRoute = [
	require("./info.js"),
	require("./auth.js"),
	require("./test.js"),
	require("./DTManage.js")
]


module.exports = function(instance){
	listRoute.forEach((route)=>{
		route(instance)
	})
}