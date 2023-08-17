const {  DataTypes } = require("sequelize")
const { user } = require("../Authentication/auth.js")

function defineDTModel(dt_id){
  let model = models.conn.touchDatatablesDB.define(`dt_${dt_id}`,{
    key:{
      type:DataTypes.TEXT
    },
    value:{
      type:DataTypes.TEXT
    },
    timestamp:{
      type:DataTypes.TEXT
    },
    by:{
      type:DataTypes.TEXT
    }
  },{
    freezeTableName: true,
  timestamps: false,
  })
  return model
}

async function createDTModel(dt_id){
  let model = defineDTModel(dt_id)
  await model.sync()
  return model
}


module.exports = class DTService {
  static async getDT(dt_id, accessLevel) {
    let dt = await models.DataTables.findOne({
      where: {
        dt_id: dt_id
      }
    })
    if (dt) {
      if (dt.status == "banned" && accessLevel != 3) {
        throw {
          name: "Action Error",
          message: "Datatable has been banned !"
        }
      }

      if (dt.status == "locked" && accessLevel != 2) {
        throw {
          name: "Action Error",
          message: "Datatable has been locked !"
        }
      }

      return dt
    } else {
      throw {
        name: "Action Error",
        message: "Datatable doesn't exist !"
      }
    }
  }

  static async getAll(limit = 5, offset = 0) {
    try {
      let list = await models.DataTables.findAll({
        limit: limit,
        offset: offset,
        raw: true
      })
      return list
    } catch (err) {
      throw {
        name: "Action Error",
        message: "Cannot get list datatables !"
      }
    }
  }

  static async getByOwners(user_id, limit = 5, offset = 0) {
    try {
      let list = await models.DataTables.findAll({
        includes: {
          model: models.Users,
          where: {
            user_id: user_id
          }
        },
        limit: limit,
        offset: offset,
        raw: true
      })
      return list
    } catch (err) {
      throw {
        name: "Action Error",
        message: "Cannot get list datatables !"
      }
    }
  }

  static async create(createBy, name) {
    let dt_id = (Math.floor(Math.random() * 999999) * Date.now()).toString(16)
    try {
      let dt = await models.DataTables.create({
        dt_id: dt_id,
        name: name,
        createBy: createBy.user_id,
        status: "active"
      })
      await dt.addOwner(createBy)
      await createDTModel(dt_id)
      return dt
    } catch (err) {
      throw {
        name: "Action Error",
        message: "Cannot create datatables !"
      }
    }
  }

  static async remove(dt_id, accessLevel = 0) {
    let dt = await this.getDT(dt_id, accessLevel)
    await dt.destroy()
    return dt
  }

  static async info(dt_id, accessLevel = 0) {
    let dt = await this.getDT(dt_id, accessLevel)
    return dt
  }

  static async removeOwners(dt_id, owner, accessLevel = 0) {
    let dt = await this.getDT(dt_id, accessLevel)
    try {
      owner = await user(owner, true)
    } catch (err) {
      throw {
        name: "Action Error",
        message: err.message
      }
    }

    if (!(await dt.hasOwner(owner))) {
      throw {
        name: "Action Error",
        message: "Owner doesn't exists !"
      }
    }
    return await dt.removeOwner(owner)
  }

  static async addOwner(dt_id, owner, accessLevel = 0) {
    let dt = await this.getDT(dt_id, accessLevel)
    try {
      owner = await user(owner, true)
    } catch (err) {
      throw {
        name: "Action Error",
        message: err.message
      }
    }

    if (await dt.hasOwner(owner)) {
      throw {
        name: "Action Error",
        message: "Owner already exists !"
      }
    }

    await dt.addOwner(owner)
    return {
      dt_id,
      owner: {
        user_id: owner.user_id,
        name: owner.name
      }
    }
  }

  static async owners(dt_id, accessLevel = 0) {
    let dt = await this.getDT(dt_id, accessLevel)
    return await dt.getOwner({
      attributes: ["user_id", "name"],
      raw: true
    })

  }

  static async isOwner(dt_id, user_id) {
    let dt = await models.DataTables.findOne({
      where: {
        dt_id: dt_id
      }
    })
    if (dt) {
      if (dt.createBy == user_id) {
        return [true, "creator"]
      } else {
        try {
          owner = await user(owner, true)
        } catch (err) {
          throw {
            name: "Action Error",
            message: err.message
          }
        }
        return [dt.hasOwner(owner), "owner"]
      }
      return dt
    } else {
      throw {
        name: "Action Error",
        message: "Datatable doesn't exist !"
      }
    }
  }

  static async getCreator(dt_id, accessLevel = 0) {
    let dt = await this.getDT(dt_id, accessLevel)
    return dt.createBy
  }
}