module.exports.generateErrorResponse = function (res, code=400, name, message) {
   return res.code(code).send({
      error:{
        name:name,
        message:message
      }
   })
}

module.exports.generateID = function(){
  return (Math.floor(Math.random()*9999999)*Date.now()).toString(16)
}