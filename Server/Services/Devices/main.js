const { user } = require("../Authentication/auth.js")

module.exports = class DevicesService {
	static async getDevice(device_id, accessLevel = 0) {
		let device = await models.Devices.findOne({
			where: {
				device_id: device_id
			}
		})

		if (device) {
			if (device.status == "banned" && accessLevel != 3) {
				throw {
					name: "Action Error",
					message: "Device has been banned !"
				}
			}

			if (device.status == "locked" && accessLevel != 2) {
				throw {
					name: "Action Error",
					message: "Device has been locked !"
				}
			}

			return device
		} else {
			throw {
				name: "Action Error",
				message: "Device doesn't exist !"
			}
		}
	}

	static async getAll(limit = 5, offset = 0) {
		let list = await models.Devices.findAll({
			limit,
			offset,
			raw: true
		})

		return list
	}

	static async getByOwner(owner, limit, offset) {
		let list = await models.Users.findAll({
			includes: {
				model: models.Users,
				where: {
					user_id: owner.user_id
				}
			},
			limit: limit,
			offset: offset,
			raw: true
		})
		return list
	}

	static async create(name, owner) {
		let device_id = (Math.floor(Math.random() * 999999) * Date.now()).toString(16)
		let device = await models.Devices.create({
			device_id: device_id,
			name: name,
			status: "active",
			createBy: owner.user_id
		})
		await device.addOwner(owner)
		return device
	}

	static async isCreator(device_id, creator) {
		let device = await models.Devices.findOne({
			where: {
				device_id: device_id
			}
		})
		return device.createBy == creator.user_id
	}

	static async isOwner(device_id, owner) {
		let device = await models.Devices.findOne({
			where: {
				device_id: device_id
			}
		})
		return await device.hasOwner(owner)
	}

	static async remove(device_id) {
		let device = await models.Devices.findOne({
			where: {
				device_id: device_id
			}
		})
		return await device.destroy()
	}
}