const connect = require("./connect.js")

module.exports = connect("tokens").schema.createTableIfNotExists("tokens", function(table) {
	table.string("userID")
	table.string('createAt')
	table.string('token')
	table.string("status").defaultTo("active")
	table.string("info").defaultTo("unknown")
})