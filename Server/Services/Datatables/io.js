const { DataTypes } = require("sequelize")

function getDTModel(dt_id) {
  let model = models.conn.sequelize_dt.define(`dt_${dt_id}`, {
    value: {
      type: DataTypes.TEXT
    },
    lastUpdate: {
      type: DataTypes.INTEGER
    }

  }, {
    freezeTableName: true,
    timestamps: false
  })
  return model
}

module.exports = class DataTableIOService {
  static async getData(dt_id, limit = 5, offset = 0) {
    try {
      let model = await getDTModel(dt_id)
      return await model.findAll({
        orderBy: [
          ["lastUpdate", "DES"]
        ],
        limit: limit,
        offset: offset
      })
    } catch (err) {
      throw {
        name: "Action Error"
      }
    }

  }

  static async setData(dt_id, value) {
    try {
      let model = await getDTModel(dt_id)
      let data = await model.create({
        value: value,
        lastUpdate: Date.now()
      })
      return {
        value,
        timestamps: data.lastUpdate
      }
    } catch (err) {
      throw {
        name: "Action Error"
      }
    }
  }

}