 const { Sequelize } = require('sequelize');

const Op = Sequelize.Op;
async function createDTModel(name,owners){
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


function getAllDTModel(owners){
  
}

module.exports = {
  createDTModel
}