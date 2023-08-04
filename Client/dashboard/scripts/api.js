window.TOUCH_CLIENT_APP_EVENTS = {}
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

class TouchClientAppEventManager{
  
  static addEventListener(name,callback){
    if(!window.TOUCH_CLIENT_APP_EVENTS[name]) window.TOUCH_CLIENT_APP_EVENTS[name] = []
    window.TOUCH_CLIENT_APP_EVENTS[name].push(callback)
  }
  
  static emitEvent(name,data){
    if(!window.TOUCH_CLIENT_APP_EVENTS[name]) window.TOUCH_CLIENT_APP_EVENTS[name] = []
    window.TOUCH_CLIENT_APP_EVENTS[name].forEach(callback=>{
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
  get currentUser(){
    return Object.freeze(Object.assign({},this.#user))
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
      this.app.eventManager.emitEvent("authstatechange",this.currentUser)
      return this.currentUser
    } catch (err) {
      if (err.isAxiosError) throw getResponseErr(err)
    }
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