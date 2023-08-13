function getResponseErr(err) {
  if (err.code == "ERR_NETWORK") return { message: "Can not connect to server !" }
  return err.response.data.error
}

function shouldReAuth(err){
  if(["Auth Error","Token Error","Permission Error"].includes(getResponseErr(err).name)){
    return true
  }
  
  return false
}

class TouchCookieManager {
  static setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  static getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  static eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}

class TouchClientAppAuth {

  #user
  constructor(app) {
    this.app = app
    this.base = app.server
    this.#user = {
      username: null,
      user_id: null,
      role: null,

    }
  }

  get currentUser() {
    return this.#user
  }

  async login(username, password) {
    try {
      let response = await axios({
        method: "post",
        url: `${this.base}/api/v1/auth/login`,
        data: {
          username: username,
          password: password,
          info: window.navigator.userAgent
        }
      })

      let data = response.data.results
      let tokens = data.tokens
      this.#user.username = data.name
      this.#user.user_id = data.id
      this.#user.role = data.role
      TouchCookieManager.setCookie("at", tokens.accessToken)
      TouchCookieManager.setCookie("rt", tokens.refreshToken)
      this.app.emitEvent("authstatechange", this.currentUser)
      return this.currentUser
    } catch (err) {
      console.log(err);
      throw getResponseErr(err)
    }
  }

  async info() {
    try {
      let response = await axios({
        method: "post",
        url: `${this.base}/api/v1/auth/info`,
        headers: {
          authorization:`token ${TouchCookieManager.getCookie("at")}`
        }
      })
      
      let data = response.data.results
      this.#user.username = data.name
      this.#user.user_id = data.id
      this.#user.role = data.role
      return this.#user
    } catch (err) {
      
    }
  }

async token(){
  try {
    let response = await axios({
      method: "post",
      url: `${this.base}/api/v1/auth/token`,
      data: {
        refreshToken: `${TouchCookieManager.getCookie("rt")}`
      }
    })
  
    
    return this.#user
  } catch (err) {
    throw getResponseErr(err)
  }
}
}

class TouchClientApp {
  constructor(configs) {
    this.configs = configs
    this.server = configs.base
    this.auth = new TouchClientAppAuth(this)
    this.events = {}
  }

  emitEvent(name, data) {
    if (!this.events[name]) this.events[name] = []
    this.events[name].forEach(callback => {
      callback(data)
    })
  }

  on(name, callback) {
    if (!this.events[name]) this.events[name] = []
    this.events[name].push(callback)
  }

}

function createApp(configs) {
  return new TouchClientApp(configs)
}

var TouchApp = createApp({
  base: "https://jolly-good-anger.glitch.me"
})

