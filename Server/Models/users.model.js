const connect = require("connect.js")

module.exports = connect("users").schema.createTableIfNotExists("users", function(table) {
	table.string("userID")
	table.string('name');
	table.string('role').defaultTo("user")
	table.string("status").defaultTo("active")
	table.string("attr").defaultTo("{}")
	table.string("password")
})