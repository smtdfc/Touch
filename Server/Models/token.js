const path = require('path')
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: path.join(__dirname, "../../Data/db/token.db")
});

const RefreshToken = sequelize.define('refreshtoken', {
	token: {
		type: DataTypes.STRING,
		allowNull: false
	},
	device: {
		type: DataTypes.STRING
	},
	loginAt:{
		type:DataTypes.STRING
	}
}, {
	freezeTableName: true,
	timestamps: false,
	createAt: false,
	updatedAt: false
});

module.exports = RefreshToken