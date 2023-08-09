const {  DataTypes } = require("sequelize")

function getDTModel(dt_id) {
  let model = models.conn.sequelize_dt.define(`dt_${dt_id}`, {
    field: {
      type: DataTypes.TEXT
    },
    value: {
      type: DataTypes.TEXT
    },
    lastUpdate: {
      type: DataTypes.TEXT
    }

  }, {
    freezeTableName: true,
    timestamps: false
  })
  return model
}

module.exports = class DataTableIOService{
  static async getData(dt_id,limit=5,offset=0){
    try {
      let model = await getDTModel(dt_id)
      return await model.findAll({
        limit:limit,
        offset:0
      })
    } catch (err) {
      throw {
        name:"Action Error"
      }
    }
    
  }
  
  static async setData(dt_id,field,value){
    try {
      let model = await getDTModel(dt_id)
       await model.create({
        field:field,
        value:value,
        lastUpdate:Date.now()
      })
      return {
        field,value
      }
    } catch (err) {
      throw {
        name: "Action Error"
      }
    }
  }
  
}