const path = require("path")
const knex = require('knex')

module.exports = function(name) {
	const options = {
		client: 'sqlite3',
		connection: {
			filename: path.join(__dirname,`../../Data/db/${name}.db`)
		}
	}

	return knex(options);
}
