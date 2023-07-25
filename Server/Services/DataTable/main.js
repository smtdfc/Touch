const { Sequelize } = require('sequelize');
const connect = require("../../Models/connect.js")
const Op = Sequelize.Op;
async function generateDTModels(dt_id) {
  let conn = connect("datatables")
  let dt = conn.define('list', {
    id: {
      type: DataTypes.INTEGER,
      privateKey: true,
      autoIncrement: true
    },
    "lastUpadate": {
      type: DataTypes.TEXT
    },
    "name": {
      type: DataTypes.TEXT,
      defaultValue: "active"
    },
    "value": {
      type: DataTypes.TEXT,
      defaultValue: "{}"
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    createAt: false,
    upadateAt: false
  });

  return dt
}

async function createDT(name, owners) {
  try {
    let id = (Math.floor(Math.random() * 9999) * Date.now()).toFixed(16)
    await models.ListDTModel.create({
      name: name,
      dt_id: id,
      status: "active",
      attr: "{}",
      createBy: owners,
      owners: "",
    })
    let dt = await generateDTModels(id)
    await dt.sync()
    return {
      owners: [],
      createBy: owners,
      status: "active",
      name: name,
      id: id
    }
  } catch (err) {
    throw {
      name: "Action Error",
      message: "Cannot create new DT !"
    }
  }

}

async function removeDT(dt_id, owner) {
  try {
    await models.ListDTModel.destroy({
      where: {
        dt_id:dt_id,
        [Op.or]:{
          createBy:owner,
          owners:{
            [Op.like]:`%${owner}%`
          }
        }
      }
    })
    let dt = await generateDTModels(id)
    await dt.drop()
    return {
    }
  } catch (err) {
    throw {
      name: "Action Error",
      message: "Cannot create new DT !"
    }
  }
}

async function getAllDT(limit = 0, offset = 0) {
  try {
    let results = await models.ListDTModel.findAll({
      where: {},
      limit: limit,
      offset: offset,
    })
    return results
  } catch (err) {
    throw {
      name: "Action Error",
      message: "Cannot get all DT !"
    }
  }
}

module.exports = {
  createDT,
  getAllDT,
  removeDT
}