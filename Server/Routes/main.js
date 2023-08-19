const routes =[
  require("./api.js")
]
module.exports = function(fastify){
  routes.forEach(r=>{
    r(fastify)
  })
}