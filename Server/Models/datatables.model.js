const connect = require("./connect.js")
const { DataTypes } = require("sequelize")


global.models.ListDTModel = connect("list_datatable").define("list", {
  "createAt": {
    type: DataTypes.TEXT
  },
  "name": {
    type: DataTypes.TEXT
  },
  "status": {
    type: DataTypes.TEXT,
    defaultValue: "active"
  },
  "attr": {
    type: DataTypes.TEXT,
    defaultValue: "{}"
  },


}, {
  freezeTableName: true,
  timestamps: false,
  createAt: true,
  upadateAt: false
})

global.models.ListDTOwnersModel = connect("list_datatable").define("owners", {
  "userID": {
    type: DataTypes.TEXT
  },
}, {
  freezeTableName: true,
  timestamps: false,
  createAt: true,
  upadateAt: false
})

global.models.ListDTModel.hasMany(global.models.ListDTOwnersModel,{as:"owners"})
