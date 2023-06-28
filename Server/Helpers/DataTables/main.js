const dt = require("../../Models/datatable.js")
const ListDTModel = dt.ListDataTable

async function listDT(owner) {
	try {
		let r = await ListDTModel.find({
			where: {
				owner: owner
			}
		})
		return {
			list: r
		}
	} catch (e) {
		throw {
			name: "DataTable Error",
			message: "Cannot get list DataTable !"
		}
	}
}

async function createDT(owner, name) {
	let r = await ListDTModel.findOne({
		where: {
			name: name,
			owner: owner
		}
	})
	if (r) {
		throw {
			name: "DataTable Error",
			message: "DataTable already exist !"
		}
	} else {
		try {
			let dt_model = dt.createDTModel(owner, name)
			await dt_model.sync()
			await ListDTModel.create({
				name: name,
				owner: owner,
				attr: "{}"
			})
			return {
				name: name,
				owner: owner
			}
		} catch (e) {
			throw {
				name: "DataTable Error",
				message: "Cannot create DataTable !"
			}
		}

	}
}
async function deleteDT(owner, name) {
	let r = await ListDTModel.findOne({
		where: {
			name: name,
			owner: owner
		}
	})
	if (!r) {
		throw {
			name: "DataTable Error",
			message: "DataTable does not exist !"
		}
	} else {
		try {
			let dt_model = dt.createDTModel(owner, name)
			await dt_model.drop()
			await ListDTModel.destroy({
				where:{
					name: name,
					owner: owner
				}
			})
			return {
				name: name,
				owner: owner
			}
		} catch (e) {
			throw {
				name: "DataTable Error",
				message: "Cannot delete DataTable !"
			}
		}

	}
}

module.exports = {
	listDT,
	createDT,
	deleteDT
}