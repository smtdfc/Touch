const path = require('path')
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: path.join(__dirname, "../../Data/db/datatables/list.db")
});

const ListDataTable = sequelize.define('listdt', {
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	owner: {
		type: DataTypes.STRING
	},
	attr: {
		type: DataTypes.STRING,
		default: "{}"
	}
}, {
	freezeTableName: true,
	timestamps: false,
	createAt: false,
	updatedAt: false
});

module.exports = ListDataTable