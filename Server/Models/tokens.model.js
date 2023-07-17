const connect = require("./connect.js")
module.exports = connect("tokens").define("tokens", {
  "userID": {
    type: DataTypes.TEXT
  },
  "token": {
    type: DataTypes.TEXT
  },
  "info": {
    type: DataTypes.TEXT,
    defaultValue: "user"
  },
  "status": {
    type: DataTypes.TEXT,
    defaultValue: "active"
  },

}, {
  freezeTableName: true,
  timestamps: false,
  createAt: true,
  upadateAt: false
})