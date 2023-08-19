const {  DataTypes } = require("sequelize")

function defineDTModel(dt_id) {
  let model = models.conn.touchDatatablesDB.define(`dt_${dt_id}`, {
    key: {
      type: DataTypes.TEXT
    },
    value: {
      type: DataTypes.TEXT
    },
    timestamp: {
      type: DataTypes.TEXT
    },
    by: {
      type: DataTypes.TEXT
    }
  }, {
    freezeTableName: true,
    timestamps: false,
  })
  return model
}

module.exports = class DatatablesIO {
  static async write(dt_id, key, value,by) {
    let timestamp = Date.now()
    let model = defineDTModel(dt_id)
    await model.create({
      key:key,
      value:JSON.stringify(value),
      timestamp:timestamp,
      by:by
    })
    
  }
}