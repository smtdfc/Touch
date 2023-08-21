const Crypto = require("crypto")
const { user } = require("../Authentication/auth.js")
const TokenService = require("../Authentication/token.js")
class Device {
  constructor(device) {
    this.device = device
  }

  compareToken(token) {
    return this.device.token == token
  }

  info() {
    return this.device
  }
  isStatuses(statuses = []) {
    return statuses.includes(this.device.status)
  }

  isCreator(user) {
    return this.device.createBy == user.user_id
  }

  async isOwner(user) {
    return await this.device.hasOwner(user)
  }

  async remove() {
    return await this.device.destroy()
  }

  async listOwner() {
    return await this.device.getOwner({
      attributes: ["user_id", "name"]
    })
  }

  async addOwner(user) {
    if (this.device.hasOwner(user)) {
      throw {
        name: "Action Error",
        message: "Owner already exists !"
      }
    } else {
      await this.device.addOwner(user)
      return {
        device: this.device,
        owner: owner
      }
    }
  }

  async changeDataTable(dt_id){
    this.device.datatable = dt_id
    await this.device.save()
  }
  
  async removeOwner(user) {
    if (user.user_id == this.device.createBy) {
      throw {
        name: "Action Error",
        message: "You cannot delete yourself because you are the creator of this device ! !"
      }
    }
    if (this.device.hasOwner(user)) {
      await this.device.removeOwner(user)
      return this.device
    } else {
      throw {
        name: "Action Error",
        message: "Owner doesn't exist !"
      }
    }
  }
}

module.exports.getAllDevice = async function(limit = 5, offset = 0) {
  let list = await models.Devices.findAll({
    limit,
    offset,
    attributes: ["device_id", "name", "status", "createBy"]
  })

  return list
}

module.exports.getDevice = async function(device_id) {
  let device = await models.Devices.findOne({
    where: {
      device_id: device_id
    }
  })

  if (!device) {
    throw {
      name: "Action Error",
      message: "Device doesn't exist !"
    }
  } else {
    return new Device(device)
  }
}


module.exports.createDevice = async function(name, creator,dt) {
  let device_id = (Math.floor(Math.random() * 99999) * Date.now()).toString(16)
  let token = Crypto
    .randomBytes(30)
    .toString('base64')
    .slice(0, 30)

  let device = await models.Devices.create({
    device_id: device_id,
    name: name,
    createBy: creator.user_id,
    status: "active",
    token:token,
    datatable:dt.info().dt_id
  })
  
  await device.addOwner(creator)
  return new Device(device)
}