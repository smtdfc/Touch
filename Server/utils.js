module.exports.generateErrResponse = function(reply,code,err){
  return reply.code(code).send({
    status:"error",
    error:{
      name:err.name,
      message:err.message
    }
  })
}

module.exports.generateSuccessResponse = function(reply, code, results) {
  return reply.code(code).send({
    status: "success",
    results: results 
  })
}

