const { Sequelize, DataTypes } = require("sequelize")
const configs = require("./configs.js")

models.conn = {}
models.conn.touchDB = new Sequelize(configs.touch_db)
models.conn.touchDatatablesDB = new Sequelize(configs.touch_datatables_db)

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

models.LoginHistory = models.conn.touchDB.define("login_history", {
  user_id: {
    type: DataTypes.TEXT
  },
  token: {
    type: DataTypes.TEXT
  },
  info: {
    type: DataTypes.TEXT
  }
}, {
  freezeTableName: true,
  timestamps: false,
})

models.DataTables = models.conn.touchDB.define("datatables", {
  dt_id: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
  name: {
    type: DataTypes.TEXT,
  },
  createBy: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.TEXT,
  }
}, {
  freezeTableName: true,
  timestamps: false,
})

models.DataTables_Users = models.conn.touchDB.define("datatables_users", {
user_id: {
    type: DataTypes.TEXT,
    references: {
      model: models.Users, 
      key: 'user_id'
    }
  },
  dt_id: {
    type: DataTypes.TEXT,
    references: {
      model: models.DataTables, 
      key: 'dt_id'
    }
  }
}, {
  freezeTableName: true,
  timestamps: false,
})

models.Users.belongsToMany(models.DataTables,{foreignKey:'dt_id', through:models.DataTables_Users})
models.DataTables.belongsToMany(models.Users,{foreignKey:'user_id', through:models.DataTables_Users,as:"owner"})
async function setup() {
  await models.DataTables_Users.sync({ alter: true })
}

setup()