class TouchClientAppAuth{
  constructor(app){
    this.app = app
    this.base = app.server
  }
  
  async login(username, password ){
    try {
      let response= await axios({
        method:"post",
        url:`${this.base}/api/1/auth/login`,
        data:{
          username:username,
          password:password,
          info:window.navigator.userAgent
        }
      })
    } catch (err) {}
  }
}

class TouchClientApp{
  constructor(configs){
    this.configs = configs
    this.server = configs.base
    this.auth = new TouchClientAppAuth(this)
  }
}

function createApp(configs){
  return new TouchClientApp(configs)
}

let tapp = createApp({
  base:"https://jolly-good-anger.glitch.me"
})

tapp.auth.login("smtdfc","123456")