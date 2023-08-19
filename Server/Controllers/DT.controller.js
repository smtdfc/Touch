const DTService = require("../Services/DataTables/main.js")
const AuthService = require("../Services/Authentication/auth.js")
const { generateErrResponse, generateSuccessResponse } = require("../utils.js")

module.exports = class DTController {
  static async list(request, reply) {
    if (!request.user) {
      return generateErrResponse(reply, {
        name: "Permission Error",
        message: "Access has been blocked !"
      })
    }

    if (request.user._user.role == "admin") {
      try {
        return generateSuccessResponse(reply, await DTService.getAllDataTable(
          request.body.limit ?? 5,
          request.body.offset ?? 0
        ))
      } catch (err) {
        generateErrResponse(reply, err)
      }
    }
  }

  static async create(request, reply) {
    if (!request.user) {
      return generateErrResponse(reply, {
        name: "Permission Error",
        message: "Access has been blocked !"
      })
    }

    try {
      return generateSuccessResponse(reply, await DTService.createDataTable(
        request.body.name,
        request.user._user
      ))
    } catch (err) {
      generateErrResponse(reply, err)
    }
  }

  static async remove(request, reply) {
    if (!request.user) {
      return generateErrResponse(reply, {
        name: "Permission Error",
        message: "Access has been blocked !"
      })
    }

    try {
      let dt = await await DTService.getDataTable(request.body.dt_id)
      if (request.user._user.role == "admin") {
        return generateSuccessResponse(reply, await dt.remove())
      } else {
        if (dt.isStatuses(["active", "lock"]) && dt.isCreator(request.user._user)) {
          return generateSuccessResponse(reply, await dt.remove())
        } else {
          throw {
            name: "Action Error",
            message: "You do not have permission to delete this DataTable !"
          }
        }
      }
    } catch (err) {
      generateErrResponse(reply, err)
    }
  }

  static async owners(request, reply) {
    if (!request.user) {
      return generateErrResponse(reply, {
        name: "Permission Error",
        message: "Access has been blocked !"
      })
    }

    try {
      let dt = await await DTService.getDataTable(request.body.dt_id)
      if (request.user._user.role == "admin") {
        return generateSuccessResponse(reply, await dt.listOwner())
      } else {
        if (dt.isStatuses(["active", "lock"]) && dt.isCreator(request.user._user)) {
          return generateSuccessResponse(reply, await dt.listOwner())
        } else if (dt.isStatuses(["active"]) && await dt.isOwner(request.user._user)) {
          return generateSuccessResponse(reply, await dt.listOwner())
        } else {
          throw {
            name: "Action Error",
            message: "You do not have permission to delete this DataTable !"
          }
        }
      }
    } catch (err) {
      generateErrResponse(reply, err)
    }
  }

  static async info(request, reply) {
    if (!request.user) {
      return generateErrResponse(reply, {
        name: "Permission Error",
        message: "Access has been blocked !"
      })
    }

    try {
      let dt = await await DTService.getDataTable(request.body.dt_id)
      if (request.user._user.role == "admin") {
        return generateSuccessResponse(reply, await dt.info())
      } else {
        if (dt.isStatuses(["active", "lock"]) && dt.isCreator(request.user._user)) {
          return generateSuccessResponse(reply, await dt.info())
        } else if (dt.isStatuses(["active"]) && await dt.isOwner(request.user._user)) {
          return generateSuccessResponse(reply, await dt.info())
        } else {
          throw {
            name: "Action Error",
            message: "You do not have permission to delete this DataTable !"
          }
        }
      }
    } catch (err) {
      generateErrResponse(reply, err)
    }
  }

  static async addOwner(request, reply) {
    if (!request.user) {
      return generateErrResponse(reply, {
        name: "Permission Error",
        message: "Access has been blocked !"
      })
    }

    try {
      let dt = await await DTService.getDataTable(request.body.dt_id)
      if (request.user._user.role == "admin") {
let user = null
try {
  user = await AuthService.user(request.body.user_id, true)
} catch (err) {
  err.name = "Action Error"
  throw err
}        return generateSuccessResponse(reply, await dt.addOwner(user))
      } else {

        if (dt.isStatuses(["active", "lock"]) && dt.isCreator(request.user._user)) {
let user = null
try {
  user = await AuthService.user(request.body.user_id, true)
} catch (err) {
  err.name = "Action Error"
  throw err
}          return generateSuccessResponse(reply, await dt.addOwner(user))
        } else {
          throw {
            name: "Action Error",
            message: "You do not have permission to delete this DataTable !"
          }
        }
      }
    } catch (err) {
      generateErrResponse(reply, err)
    }
  }

  static async removeOwner(request, reply) {
    if (!request.user) {
      return generateErrResponse(reply, {
        name: "Permission Error",
        message: "Access has been blocked !"
      })
    }

    try {
      let dt = await await DTService.getDataTable(request.body.dt_id)
      if (request.user._user.role == "admin") {
        let user = null
        try {
          user = await AuthService.user(request.body.user_id, true)
        } catch (err) {
          err.name = "Action Error"
          throw err
        }
        return generateSuccessResponse(reply, await dt.removeOwner(user))
      } else {
        if (dt.isStatuses(["active", "lock"]) && dt.isCreator(request.user._user)) {
          let user = null
          try {
            user = await AuthService.user(request.body.user_id, true)
          } catch (err) {
            err.name = "Action Error"
            throw err
          }
          return generateSuccessResponse(reply, await dt.removeOwner(user))
        } else {
          throw {
            name: "Action Error",
            message: "You do not have permission to delete this DataTable !"
          }
        }
      }
    } catch (err) {
      generateErrResponse(reply, err)
    }
  }
}