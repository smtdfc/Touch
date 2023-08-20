module.exports.generateErrResponse = function(reply,err){
  let code = 400
  if(["Auth Error","Token Error"].includes(err.name)){
    code = 401
  }
  
  if (["Permission Error"].includes(err.name)) {
    code = 403
  }
  
  return reply.code(code).send({
    status:"error",
    error:{
      name:err.name,
      message:err.message
    }
  })
}

module.exports.generateSuccessResponse = function(reply, results) {
  return reply.code(200).send({
    status: "success",
    results: results 
  })
}


