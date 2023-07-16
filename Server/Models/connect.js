const path = require("path")
const { Sequelize } = require('sequelize');

module.exports = function(name) {
	const sequelize = new Sequelize({
		dialect: 'sqlite',
		storage: path.join(__dirname,`../../Data/db/${name}.db`)
	});
	return sequelize
}

