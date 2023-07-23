const connect = require("./connect.js")
const { DataTypes } = require("sequelize")

let conn = connect("list_datatable")
models.ListDTModel = conn.define('list', {
  id: {
    type: DataTypes.INTEGER,
     privateKey:true,
     autoIncrement:true
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
    "owners": {
      type: DataTypes.TEXT,
      defaultValue: "unknown"
    },
}, {
  freezeTableName: true,
  timestamps: false,
  createAt: true,
  upadateAt: false
});

