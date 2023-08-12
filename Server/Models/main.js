const { Sequelize, DataTypes } = require("sequelize")
const configs = require("./configs.js")

models.conn = {}
models.conn.touchDB = new Sequelize(configs.touch_db)

models.Users = models.conn.touchDB.define("users", {
  user_id: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
  name: {
    type: DataTypes.TEXT,
  },
  role: {
    type: DataTypes.TEXT,
    defaultValue: "user"
  },
  status: {
    type: DataTypes.TEXT,
    defaultValue: "active"
  },
  group_id: {
    type: DataTypes.TEXT,
    defaultValue: "unknown"
  },
  password: {
    type: DataTypes.TEXT,
  }
}, {
  freezeTableName: true,
  timestamps: false,
})

models.LoginHistory = models.conn.touchDB.define("login_history",{
  user_id:{
    type:DataTypes.TEXT
  },
  token:{
    type:DataTypes.TEXT
  },
  info:{
    type:DataTypes.TEXT
  }
},{
  freezeTableName: true,
  timestamps: false,
})