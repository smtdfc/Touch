 const { Sequelize } = require('sequelize');

const Op = Sequelize.Op;
async function createDT(name,owners){
  try {
    let id = (Math.floor(Math.random() * 9999) * Date.now()).toFixed(16)
    await models.ListDTModel.create({
      name: name,
      dt_id: id,
      status: "active",
      attr: "{}",
      owners: owners
    })
    return {
      owners:owners.split(","),
      status:"active",
      name:name,
      id:id
    }
  } catch (err) {
    throw {
      name:"Action Error",
      message:"Cannot create new DT !"
    }
  }
  
}


function getAllDT(limit=0,offset=0){
  try {
    let results = await models.ListDTModel.findAll({
      where:{},
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
  getAllDT
}