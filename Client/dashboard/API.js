function getResponseErr(err) {
  if (err.code == "ERR_NETWORK") return { message: "Can not connect to server !" }
  return err.response.data.error
}

function shouldReAuth(err) {
  if (["Auth Error", "Token Error", "Permission Error"].includes(getResponseErr(err).name)) {
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
      reset: function() {
        this.usernameb = null
        this.user_id = null
        this.role = null
      }
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
          authorization: `token ${TouchCookieManager.getCookie("at")}`
        }
      })

      let data = response.data.results
      this.#user.username = data.name
      this.#user.user_id = data.id
      this.#user.role = data.role
      return this.#user
    } catch (err) {
      if (shouldReAuth(err)) {
        let res = await this.retryWithNewToken(this.info, [], this)
        if (res.error) {
          this.#user.reset()
          this.app.emitEvent("authstatechange", this.currentUser)
        } else {
          return res.returnValue
        }

        return
      }
      throw getResponseErr(err)
    }


  }
  async logout() {
    try {
      let response = await axios({
        method: "post",
        url: `${this.base}/api/v1/auth/logout`,
        headers: {
          authorization: `token ${TouchCookieManager.getCookie("at")}`
        },
        data: {
          refreshToken: `${TouchCookieManager.getCookie("rt")}`
        }
      })
      this.#user.reset()
      TouchCookieManager.eraseCookie("at")
      TouchCookieManager.eraseCookie("rt")
      this.app.emitEvent("authstatechange", this.currentUser)
      return this.#user
    } catch (err) {
      if (shouldReAuth(err)) {
        let res = await this.retryWithNewToken(this.info, [], this)
        if (res.success) return res.returnValue
        throw res.error
      }
      throw getResponseErr(err)
    }
  }
  async token() {
    try {
      let response = await axios({
        method: "post",
        url: `${this.base}/api/v1/auth/token`,
        data: {
          refreshToken: `${TouchCookieManager.getCookie("rt")}`
        }
      })

      let tokens = response.data.results.tokens
      TouchCookieManager.setCookie("at", tokens.accessToken)
      TouchCookieManager.setCookie("rt", tokens.refreshToken)
      return this.#user
    } catch (err) {
      throw getResponseErr(err)
    }
  }

  async retryWithNewToken(callback, args, ctx) {
    let results = {
      success: false,
      returnValue: null,
      error: null
    }

    try {
      await this.token()
    } catch (err) {
      results.error = err
      return results
    }

    try {
      results.returnValue = await callback.bind(ctx)(...args)
      results.success = true
    } catch (err) {
      results.error = err
    }

    return results
  }
}

class DTManager {
  constructor(app) {
    this.app = app
    this.base = app.server
  }

  async list(limit = 5, offset = 0) {
    try {
      let response = await axios({
        method: "post",
        url: `${this.base}/api/v1/datatables/list`,
        headers: {
          authorization: `token ${TouchCookieManager.getCookie("at")}`
        },
        data: { limit, offset }
      })
      return response.data.results
    } catch (err) {
      if (shouldReAuth(err)) {
        let result = await this.app.auth.retryWithNewToken(this.list, [limit, offset], this)
        if (result.success) return result.returnValue
        else throw result.error
      }
      throw getResponseErr(err)
    }
  }

  async create(name) {
    try {
      let response = await axios({
        method: "post",
        url: `${this.base}/api/v1/datatables/create`,
        headers: {
          authorization: `token ${TouchCookieManager.getCookie("at")}`
        },
        data: { name }
      })
      return response.data.results
    } catch (err) {
      if (shouldReAuth(err)) {
        let result = await this.app.auth.retryWithNewToken(this.create, [name], this)
        if (result.success) return result.returnValue
        else throw result.error
      }
      throw getResponseErr(err)
    }
  }

  async remove(dt_id) {
    try {
      let response = await axios({
        method: "post",
        url: `${this.base}/api/v1/datatables/remove`,
        headers: {
          authorization: `token ${TouchCookieManager.getCookie("at")}`
        },
        data: { dt_id }
      })
      return response.data.results
    } catch (err) {
      if (shouldReAuth(err)) {
        let result = await this.app.auth.retryWithNewToken(this.remove, [dt_id], this)
        if (result.success) return result.returnValue
        else throw result.error
      }
      throw getResponseErr(err)
    }
  }

  async info(dt_id) {
    try {
      let response = await axios({
        method: "post",
        url: `${this.base}/api/v1/datatables/info`,
        headers: {
          authorization: `token ${TouchCookieManager.getCookie("at")}`
        },
        data: { dt_id }
      })
      return response.data.results
    } catch (err) {
      if (shouldReAuth(err)) {
        let result = await this.app.auth.retryWithNewToken(this.info, [dt_id], this)
        if (result.success) return result.returnValue
        else throw result.error
      }
      throw getResponseErr(err)
    }
  }

  async owners(dt_id) {
    try {
      let response = await axios({
        method: "post",
        url: `${this.base}/api/v1/datatables/owners`,
        headers: {
          authorization: `token ${TouchCookieManager.getCookie("at")}`
        },
        data: { dt_id }
      })
      return response.data.results
    } catch (err) {
      if (shouldReAuth(err)) {
        let result = await this.app.auth.retryWithNewToken(this.owners, [dt_id], this)
        if (result.success) return result.returnValue
        else throw result.error
      }
      throw getResponseErr(err)
    }
  }

  async removeOwner(dt_id, user_id) {
    try {
      let response = await axios({
        method: "post",
        url: `${this.base}/api/v1/datatables/owners/remove`,
        headers: {
          authorization: `token ${TouchCookieManager.getCookie("at")}`
        },
        data: { dt_id, user_id }
      })
      return response.data.results
    } catch (err) {
      if (shouldReAuth(err)) {
        let result = await this.app.auth.retryWithNewToken(this.removeOwner, [dt_id, user_id], this)
        if (result.success) return result.returnValue
        else throw result.error
      }
      throw getResponseErr(err)
    }
  }

  async addOwner(dt_id, user_id) {
    try {
      let response = await axios({
        method: "post",
        url: `${this.base}/api/v1/datatables/owners/add`,
        headers: {
          authorization: `token ${TouchCookieManager.getCookie("at")}`
        },
        data: { dt_id, user_id }
      })
      return response.data.results.owner
    } catch (err) {
      if (shouldReAuth(err)) {
        let result = await this.app.auth.retryWithNewToken(this.addOwner, [dt_id, user_id], this)
        if (result.success) return result.returnValue
        else throw result.error
      }
      throw getResponseErr(err)
    }
  }
}

class DataIO {
  constructor(app) {
    this.app = app
    this.socket = app.socket
    this.listenerFn = null
    let ctx = this
    this.socket.on("data_change", function(data) {
      let dt_id = data.dt_id
      ctx.app.emitEvent(`dataio:dt_${dt_id}_change`, data)
    })

  }

  setListener(dt_id) {
    return new Promise((resolve, reject) => {
      let ctx = this


      function onErr(err) {
        reject(err)
      }

      this.socket.on("auth_err", onErr)
      this.socket.on("action_err", onErr)

      function onDTconnect() {
        ctx.socket.off("action_err", onErr)
        ctx.socket.off("auth_err", onErr)
        ctx.socket.off("dt:set_listener:success", onDTconnect)
        resolve()
      }

      this.socket.on("dt:set_listener:success", onDTconnect)
      this.socket.emit("dt:set_listener", {
        accessToken: TouchCookieManager.getCookie("at"),
        dt_id
      })
    })
  }

  removeListener(dt_id) {
    return new Promise((resolve, reject) => {
      let ctx = this
      this.socket.emit("dt:rm_listener", {
        accessToken: TouchCookieManager.getCookie("at"),
        dt_id
      })

      resolve()
    })
  }
}

class TouchClientApp {
  constructor(configs) {
    this.configs = configs
    this.server = configs.base
    this.auth = new TouchClientAppAuth(this)
    this.datatables = new DTManager(this)
    this.events = {}
    this.socket = io(configs.base)
    this.dataIO = new DataIO(this)
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

  off(name, callback) {
    if (!this.events[name]) this.events[name] = []
    for (var i = 0; i < this.events[name].length; i++) {
      if(this.events[name][i] === callback){
        this.events[name].splice(i,1)
        return 
      }
    }
  }
  
  
}

function createApp(configs) {
  return new TouchClientApp(configs)
}

var TouchApp = createApp({
  base: "https://jolly-good-anger.glitch.me"
})