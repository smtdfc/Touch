const list_route =[
  require("./auth.route.js")
]

module.exports = function(fastify){
  list_route(fastify)
}