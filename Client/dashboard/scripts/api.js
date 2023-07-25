function getBrowserName(userAgent) {
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

function shouldGetNewToken(err) {
  if (err.response.data.error) {
    let errName = err.response.data.error.name
    return ["Authentication Error", "Token Error"].includes(errName)
  }
  return false
}

class CookieManager {
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

class DTManager{
  constructor(app){
    this.app = app
    this.base = app.server
  }
  async create(name){
    if (this.app.auth.currentUser.username == null) {
      throw "Permission has been blocked"
    }
    try {
      let response = await axios({
        method: "post",
        url: `${this.base}/api/v1/admin/dt/create`,
        headers: {
          Authorization: `Token ${CookieManager.getCookie("at")}`
        },
        data:{
          name:name
        }
      })
      let info = response.data.info
      return info
    } catch (err) {
      if (shouldGetNewToken(err)) {
        let result = await this.app.auth.retryWithNewToken(
          this.create.bind(this), []
        )
        if (result.success) {
          return result.returnValue
        }
        throw {
          message: "Cannot create new  DT !"
        }
      }
    }
  }
  async getAll(limit=10,offset=5){
    if (this.app.auth.currentUser.role != "admin") {
      throw "Permission has been blocked"
    }
    
    try {
      let response = await axios({
        method: "post",
        url: `${this.base}/api/v1/admin/dt/getAll`,
        headers: {
          Authorization: `Token ${CookieManager.getCookie("at")}`
        },
        data:{
          limit,offset
        }
      })
      let list = response.data.list
      return list
    } catch (err) {
      if (shouldGetNewToken(err)) {
        let result = await this.app.auth.retryWithNewToken(
          this.getAll.bind(this), []
        )
        if (result.success) {
          return result.returnValue
        }
        throw {
          message: "Cannot get data statistics !"
        }
      }
    }
  }
  
}

class UserInfo {
  constructor() {
    this.logedin = false
    this.userID = null
    this.userName = null
    this.role = null
  }

  reset() {
    this.userID = null
    this.userName = null
    this.role = null
  }
}

class Statistics {
  constructor(app){
    this.app = app
    this.base = this.app.server
    this.data ={
      user:null
    }
  }
  
  async getUserStatistics(){
    if(this.app.auth.currentUser.role != "admin"){
      throw "Permission has been blocked"
    }
    if(this.data.user != null){
      return this.data.user
    }
    try {
      let response = await axios({
        method: "post",
        url: `${this.base}/api/v1/statistics/user`,
        headers: {
          Authorization: `Token ${CookieManager.getCookie("at")}`
        }
      })
      let data = response.data.data
      this.data.user = data
      return data
    } catch (err) {
      if (shouldGetNewToken(err)) {
        let result = await this.app.auth.retryWithNewToken(
          this.getUserStatistics.bind(this), []
        )
        if(result.success){
          return result.returnValue
        }
        throw {
          message:"Cannot get data statistics !"
        }
      }
    }
  }
}

class Authentication {
  #user
  constructor(app) {
    this.app = app
    this.base = app.server
    this.#user = {
      userID: null,
      username: null,
      role: null,
      logedin: false,
      [Symbol.toPrimitive]:function(){
        if(this.logedin)
          return `@${this.username}`
        else
          return "anonymous" 
      }
    }
  }

  async login(username, password) {
    try {
      let response = await axios({
        method: "post",
        url: `${this.base}/api/v1/auth/login`,
        data: {
          username: username,
          password: password,
          device: {
            browser: {
              userAgent: window.navigator.userAgent,
              name: getBrowserName(window.navigator.userAgent)
            }
          }
        }
      })
      let data = response.data
      let info = data.info
      let tokens = data.tokens
      CookieManager.setCookie("at", tokens.accessToken)
      CookieManager.setCookie("rt", tokens.refreshToken)
      this.#user.userID = info.id
      this.#user.username = info.name
      this.#user.role = info.role
      this.app.emitEvent("authstatechange", Object.assign({}, this.#user))
      return Object.assign({}, this.#user)
    } catch (err) {
      throw err.response.data.error
    }
  }
  get currentUser(){
    return Object.assign({}, this.#user)
  }

  async getUser() {
    if (this.#user.logedin) {
      return Object.assign({}, this.#user)
    }
    try {
      let response = await axios({
        method: "post",
        url: `${this.base}/api/v1/auth/info`,
        headers: {
          Authorization: `Token ${CookieManager.getCookie("at")}`
        }
      })
      let data = response.data
      this.#user.username = data.info.name
      this.#user.role = data.info.role
      this.#user.userID = data.info.userID
      this.#user.logedin = true
      this.app.emitEvent("authstatechange", Object.assign({}, this.#user))
      return Object.assign({}, this.#user)
    } catch (err) {
      if (shouldGetNewToken(err)) {
        let result = await this.retryWithNewToken(
          this.getUser.bind(this), []
        )
        
        if(result.error){
          this.#user.userID = null
          this.#user.username = null
          this.#user.role = null
          this.app.emitEvent("authstatechange", Object.assign({}, this.#user))
        }
      }
      return Object.assign({}, this.#user)
    }
  }

  async getNewToken() {
    try {
      let response = await axios({
        method: "post",
        url: `${this.base}/api/v1/auth/getNewToken`,
        data: {
          refreshToken: CookieManager.getCookie("rt")
        }
      })
      let data = response.data
      let tokens = data.tokens

      CookieManager.setCookie("at", tokens.accessToken)
      CookieManager.setCookie("rt", tokens.refreshToken)
      return true
    } catch (e) {

      throw {
        message: "Cannot get new token "
      }
    }
  }

  async retryWithNewToken(callback, args) {
    let result = {
      error: null,
      success: false,
      returnValue: null
    }

    try {
      await this.getNewToken()
    } catch (err) {
      result.error = err
      return result
    }

    try {
      let returnValue = await callback(...args)
      result.success = true
      result.returnValue = returnValue
    } catch (err) {
      result.error = err
    }
    return result
  }

  async logout() {
    try {
      let response = await axios({
        method: "post",
        url: `${this.base}/api/v1/auth/logout`,
        headers: {
          Authorization: `Token ${CookieManager.getCookie("at")}`
        },
        data: {
          refreshToken: CookieManager.getCookie("rt")
        }
      })
      this.#user.userID = null
      this.#user.username = null
      this.#user.role = null
      this.app.emitEvent("authstatechange", Object.assign({}, this.#user))
      return Object.assign({}, this.#user)
    } catch (err) {
      throw err.response.data.error
    }
  }
}

class App {
  constructor(configs) {
    this.server = configs.base
    this.configs = configs
    this.auth = new Authentication(this)
    this.statistics = new Statistics(this)
    this.datatables = new DTManager(this)
    this.events = {}
  }

  createEventListener(name, callback) {
    if (!this.events[name]) {
      this.events[name] = []
    }
    this.events[name].push(callback)
  }

  emitEvent(name, data) {
    if (!this.events[name]) {
      this.events[name] = []
    }

    this.events[name].forEach(callback => {
      callback(data)
    })
  }
}