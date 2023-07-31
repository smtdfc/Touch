const { Sequelize, DataTypes } = require("sequelize")
const path = require("path")


console.info("Connecting Database ")
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, "../../Data/db/touchdb.db")
});

models.Users = sequelize.define("users", {
  user_id: {
    type: DataTypes.TEXT,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
  },
  password:{
    type:DataTypes.TEXT
  },
  role: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.TEXT,
  },
  attr: {
    type: DataTypes.TEXT,
  },
  group_id: {
    type: DataTypes.TEXT,
  }
}, {
  freezeTableName: true,
  timestamps: false
})
/*
models.Users = sequelize.define("login_history", {
  token: {
    type: DataTypes.TEXT,
  },
  info: {
    type: DataTypes.TEXT,
  },
  loginAt: {
    type: DataTypes.TEXT,
  }
}, {
  freezeTableName: true,
  timestamps: false
})
*/
models.Datatables = sequelize.define("datatables", {
  dt_id: {
    type: DataTypes.TEXT,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.TEXT
  }
}, {
  freezeTableName: true,
  timestamps: false
})

const DT_Users = sequelize.define('dt_user', {
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
      model: models.Datatables,
      key: 'dt_id'
    }
  }
}, {
  freezeTableName: true,
  timestamps: false
});

models.Users.belongsToMany(models.Datatables, { through: DT_Users });
models.Datatables.belongsToMany(models.Users, { through: DT_Users });

async function setup() {
  await DT_Users.sync()
}

setup()