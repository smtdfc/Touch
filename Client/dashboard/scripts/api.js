window.TOUCH_CLIENT_APP_EVENTS = {}

axios.defaults.cache = {
  type: "memory",
  maxAge: 300000,
  maxEntries: 10,
};

function shouldReAuth(err){
   err = getResponseErr(err)
   return ["Invalid Token","Auth Error","Token Error","Permission Error"].includes(err.name)
}

function getResponseErr(err) {
  if (err.isAxiosError) {
    return {
      name: err.response.data.error.name,
      message: err.response.data.error.message
    }
  }
}

function getBrowserName(userAgent = window.navigator.userAgent) {
  // The order matters here, and this may report false positives for unlisted browsers.

  if (userAgent.includes("Firefox")) {
    // "Mozilla/5.0 (X11; Linux i686; rv:104.0) Gecko/20100101 Firefox/104.0"
    return "Mozilla Firefox";
  } else if (userAgent.includes("SamsungBrowser")) {
    // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36"
    return "Samsung Internet";
  } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_5_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 OPR/90.0.4480.54"
    return "Opera";
  } else if (userAgent.includes("Edge")) {
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    return "Microsoft Edge (Legacy)";
  } else if (userAgent.includes("Edg")) {
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 Edg/104.0.1293.70"
    return "Microsoft Edge (Chromium)";
  } else if (userAgent.includes("Chrome")) {
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
    return "Google Chrome or Chromium";
  } else if (userAgent.includes("Safari")) {
    // "Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1"
    return "Apple Safari";
  } else {
    return "unknown";
  }
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
class TouchClientAppEventManager {

  static addEventListener(name, callback) {
    if (!window.TOUCH_CLIENT_APP_EVENTS[name]) window.TOUCH_CLIENT_APP_EVENTS[name] = []
    window.TOUCH_CLIENT_APP_EVENTS[name].push(callback)
  }

  static emitEvent(name, data) {
    if (!window.TOUCH_CLIENT_APP_EVENTS[name]) window.TOUCH_CLIENT_APP_EVENTS[name] = []
    window.TOUCH_CLIENT_APP_EVENTS[name].forEach(callback => {
      callback(data)
    })
  }

}

class TouchServerConnection {
  constructor(base) {
    this.base = base
  }
  async isActive() {

  }
}

class TouchClientAuth {
  #user
  constructor(app) {
    this.app = app
    this.base = app.base
    this.#user = {
      user_id: null,
      username: null,
      role: null,
      group_id: null,
      [Symbol.toPrimitive]: function() {
        return `Touch User ${user_id} `
      }
    }
  }

  get currentUser() {
    return Object.freeze(Object.assign({}, this.#user))
  }

  async info() {
    
    try {
      let response = await axios({
        url: `${this.base}/api/v1/auth/info`,
        method: "post",
        headers: {
          authorization: `token ${TouchCookieManager.getCookie("at")}`
        },
      })
      let info = response.data.info
      this.#user.user_id = info.id
      this.#user.username = info.name
      this.#user.role = info.role
      this.#user.group_id = info.group
      return this.#user
    } catch (err) {
      if(shouldReAuth(err)){
        let result = await this.retryWithNewToken(this.info,this,[])  
        if(result.returnValue) return result.returnValue
      }
    }
    
    return {
      user_id:null,
      username:null,
      role:"unknown",
      status:"locked"
    }
  }
  
  async login(username, password) {
    try {
      let response = await axios({
        url: `${this.base}/api/v1/auth/login`,
        method: "post",
        data: {
          username: username,
          password: password,
          info: {
            browserInfo: getBrowserName()
          }
        }
      })
      let data = response.data
      let info = data.info
      let tokens = info.tokens
      this.#user.user_id = info.id
      this.#user.username = info.name
      this.#user.role = info.role
      this.#user.group_id = info.group
      TouchCookieManager.setCookie("at", tokens.accessToken)
      TouchCookieManager.setCookie("rt", tokens.refreshToken)
      this.app.eventManager.emitEvent("authstatechange", this.currentUser)
      return this.currentUser
    } catch (err) {
      if (err.isAxiosError) throw getResponseErr(err)
    }
  }

  async getNewToken() {
    try {
      let response = await axios({
        url: `${this.base}/api/v1/auth/token`,
        method: "post",
        data: {
          refreshToken:TouchCookieManager.getCookie("rt")
        }
      })
      let tokens = response.data.tokens
      TouchCookieManager.setCookie("at", tokens.accessToken)
      TouchCookieManager.setCookie("rt", tokens.refreshToken)

    } catch (err) {
      throw err
    }
  }
  async retryWithNewToken(callback,context,arg){
    let result ={
      success:false,
      returnValue:null,
      error:null
    }
    try {
      await this.getNewToken()
      result.returnValue = await callback.bind(this)(...arg)
      result.success = true
    } catch (err) {
      result.error = err
    }
    return result
  }
}

class TouchClientApp {
  constructor(configs) {
    this.configs = configs
    this.base = configs.base
    this.eventManager = TouchClientAppEventManager
    this.server = new TouchServerConnection(this.base)
    this.auth = new TouchClientAuth(this)
  }
}

function createApp(configs) {
  return new TouchClientApp(configs)
}