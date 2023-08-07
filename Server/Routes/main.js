const list_route =[
  require("./auth.route.js"),
  require("./datatables.route.js")
]

module.exports = function(fastify){
  
  list_route.forEach((r,i)=>{
    r(fastify)
    console.info(`Init RESTful API [${i+1}/${list_route.length}]`)
  })
}