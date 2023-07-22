const connect = require("./connect.js")
const { DataTypes } = require("sequelize")

let conn = connect("list_datatable")
models.ListDTModel = conn.define('list', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  "dt_id": {
    type: DataTypes.TEXT
  },
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
});

models.DTOwnersModel = conn.define('owners', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  "userID": {
    type: DataTypes.TEXT
  },
}, {
  freezeTableName: true,
  timestamps: false,
  createAt: false,
  upadateAt: false
});


models.ListDTModel.belongsToMany(models.DTOwnersModel, {
  as:"owners",
  foreignKey: 'dt_id',
  otherKey: 'owner_id',
  through: 'dt_owners',
});

models.DTOwnersModel.belongsToMany(models.ListDTModel, {
  foreignKey: 'owner_id',
  otherKey: 'dt_id',
  through: 'dt_owners',
});
conn.sync({ force: true })