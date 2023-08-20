const DeviceService = require("../Services/Devices/main.js")
const AuthService = require("../Services/Authentication/auth.js")
const { generateErrResponse, generateSuccessResponse } = require("../utils.js")

module.exports = class DevicesController {
  static async list(request, reply) {
    if (!request.user) {
      return generateErrResponse(reply, {
        name: "Permission Error",
        message: "Access has been blocked !"
      })
    }

    if (request.user._user.role == "admin") {
      try {
        return generateSuccessResponse(reply, await DeviceService.getAllDevice(
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
      return generateSuccessResponse(reply, await DeviceService.createDevice(
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
      let device = await  DeviceService.getDevice(request.body.device_id)
      if (request.user._user.role == "admin") {
        return generateSuccessResponse(reply, await device.remove())
      } else {
        if (device.isStatuses(["active", "lock"]) && device.isCreator(request.user._user)) {
          return generateSuccessResponse(reply, await device.remove())
        } else {
          throw {
            name: "Action Error",
            message: "You do not have permission to delete this Device !"
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
      let device = await  DeviceService.getDevice(request.body.device_id)
      if (request.user._user.role == "admin") {
        return generateSuccessResponse(reply, await device.listOwner())
      } else {
        if (device.isStatuses(["active", "lock"]) && device.isCreator(request.user._user)) {
          return generateSuccessResponse(reply, await device.listOwner())
        } else if (device.isStatuses(["active"]) && await device.isOwner(request.user._user)) {
          return generateSuccessResponse(reply, await device.listOwner())
        } else {
          throw {
            name: "Action Error",
            message: "You do not have permission to delete this Device !"
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
      let device = await  DeviceService.getDevice(request.body.device_id)
      if (request.user._user.role == "admin") {
        return generateSuccessResponse(reply, await device.info())
      } else {
        if (device.isStatuses(["active", "lock"]) && device.isCreator(request.user._user)) {
          return generateSuccessResponse(reply, await device.info())
        } else if (device.isStatuses(["active"]) && await device.isOwner(request.user._user)) {
          return generateSuccessResponse(reply, await device.info())
        } else {
          throw {
            name: "Action Error",
            message: "You do not have permission to delete this Device !"
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
      let device = await DeviceService.getDevice(request.body.device_id)
      if (request.user._user.role == "admin") {
        let user = null
        try {
          user = await AuthService.user(request.body.user_id, true)
        } catch (err) {
          err.name = "Action Error"
          throw err
        }
        return generateSuccessResponse(reply, await device.addOwner(user))
      } else {

        if (device.isStatuses(["active", "lock"]) && device.isCreator(request.user._user)) {
          let user = null
          try {
            user = await AuthService.user(request.body.user_id, true)
          } catch (err) {
            err.name = "Action Error"
            throw err
          }
          return generateSuccessResponse(reply, await device.addOwner(user))
        } else {
          throw {
            name: "Action Error",
            message: "You do not have permission to delete this Device !"
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
      let device = await DeviceService.getDevice(request.body.device_id)
      if (request.user._user.role == "admin") {
        let user = null
        try {
          user = await AuthService.user(request.body.user_id, true)
        } catch (err) {
          err.name = "Action Error"
          throw err
        }
        return generateSuccessResponse(reply, await device.removeOwner(user))
      } else {
        if (device.isStatuses(["active", "lock"]) && device.isCreator(request.user._user)) {
          let user = null
          try {
            user = await AuthService.user(request.body.user_id, true)
          } catch (err) {
            err.name = "Action Error"
            throw err
          }
          return generateSuccessResponse(reply, await device.removeOwner(user))
        } else {
          throw {
            name: "Action Error",
            message: "You do not have permission to delete this Device !"
          }
        }
      }
    } catch (err) {
      generateErrResponse(reply, err)
    }
  }
}