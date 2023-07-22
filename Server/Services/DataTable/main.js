function createDTModel(name,owners){
  await global.models.ListDTModel.create({
    name:name,
    status:"active",
    attr:"{}"
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

