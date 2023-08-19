class TouchError extends Error{
  constructor(name, message ){
    super(message)
    this.name = name
    this.message = message
    this.isTouchErr = true
  }
}

module.exports ={
  TouchError
}