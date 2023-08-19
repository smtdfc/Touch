const {TouchError} = require("../Classes/Error.js")
module.exports.throwErr = function(name, message ){
  throw new TouchError(
    name,
    message
  )
}