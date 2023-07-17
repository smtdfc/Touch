module.exports.generateErrorResponse = function (res, code=400, name, message) {
   return res.code(code).send({
      error:{
        name:name,
        message:message
      }
   })
}