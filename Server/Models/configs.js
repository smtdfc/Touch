const path = require("path")
module.exports = {
	touch_db: {
		logging: false,
		dialect: 'sqlite',
		storage: path.join(__dirname, "../../Data/db/touchdb.db")
	},
	touch_datatables_db: {
		logging: false,
		dialect: 'sqlite',
		storage: path.join(__dirname, "../../Data/db/touch_datatables_db.db")
	}
}