const connect = require("./connect.js")
const { DataTypes } = require("sequelize")


global.models.UsersModel = connect("users").define("users", {
	"userID": {
		type: DataTypes.TEXT
	},
	"name": {
		type: DataTypes.TEXT
	},
	"role": {
		type: DataTypes.TEXT,
		defaultValue: "user"
	},
	"status": {
		type: DataTypes.TEXT,
		defaultValue: "active"
	},
	"password": {
		type: DataTypes.TEXT,
	},
	"attr": {
		type: DataTypes.TEXT,
		defaultValue: "{}"
	},
}, {
	freezeTableName: true,
	timestamps: false,
	createAt: false,
	upadateAt: false
})