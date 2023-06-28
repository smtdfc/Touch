const DTHelper = require("../Helpers/DataTables/main.js")
class DTManageController {
	static async getListDT(request, res) {
		if (!request.user) {
			return res.response({
				status: "error",
				err: {
					name: "Permission Error",
					message: "No permission to access information ! "
				}
			}).code(403)
		} else {
			try {
				let result = await DTHelper.listDT(request.user.name)
				return res.response({
					status: "success",
					list: result.list
				}).code(200)
			} catch (e) {
				return res.response({
					status: "error",
					err: e
				}).code(400)
			}
		}
	}

	static async createDT(request, res) {
		if (!request.user) {
			return res.response({
				status: "error",
				err: {
					name: "Permission Error",
					message: "No permission to access information ! "
				}
			}).code(403)
		} else {
			try {
				let result = await DTHelper.createDT(request.user.name, request.payload.name)
				return res.response({
					status: "success",
					info: {
						...result
					}
				}).code(200)
			} catch (e) {
				return res.response({
					status: "error",
					err: e
				}).code(400)
			}
		}
	}
	static async deleteDT(request, res) {
		if (!request.user) {
			return res.response({
				status: "error",
				err: {
					name: "Permission Error",
					message: "No permission to access information ! "
				}
			}).code(403)
		} else {
			try {
				let result = await DTHelper.deleteDT(request.user.name, request.payload.name)
				return res.response({
					status: "success",
					info: {
						...result
					}
				}).code(200)
			} catch (e) {
				return res.response({
					status: "error",
					err: e
				}).code(400)
			}
		}
	}

}

module.exports = DTManageController