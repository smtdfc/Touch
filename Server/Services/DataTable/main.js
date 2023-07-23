async function createDTModel(name,owners){
  await models.ListDTModel.create({
    name:name,
    dt_id:Date.now(),
    status:"active",
    attr:"{}",
    owners:owners
  })
}


function getAllDTModel(owners){
  
}

createDTModel("399382","3829299292")