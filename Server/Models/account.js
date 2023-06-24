const path = require('path')
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: path.join(__dirname, "../../Data/db/account.db")
});

const Account = sequelize.define('account', {
	// Model attributes are defined here
	username: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING
	},
	rule: {
		type: DataTypes.STRING,
		default: "username"
	},
	attr: {
		type: DataTypes.STRING,
		default: "{}"
	}
}, {
	freezeTableName: true,
	timestamps: false,
	createAt:false,
	updatedAt:false
});

module.exports = Account