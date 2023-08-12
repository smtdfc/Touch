const routes =[
  
]
module.exports = function(fastify){
  routes.forEach(r=>{
    r(fastify)
  })
}