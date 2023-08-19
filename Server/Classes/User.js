module.exports = class TouchUser{
  constructor(user){
    this.user = user
  }
  
  comparePassword(password){
    return password== this.user.password
  }
}