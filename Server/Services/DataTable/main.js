async function createDTModel(name,owners){
  await global.models.ListDTModel.create({
    name:name,
    status:"active",
    attr:"{}",
    owners:[
      {userID:owners}
    ]
  },{
    include:[
      {
        association:global.models.ListDTOwnersModel,
        as:"owners"
      }
    ]
  })
}


function getAllDTModel(owners){
  
}

createDTModel("399382","3829299292")