async function countUser(){
  let result = await global.models.UsersModel.count()
  return result
}

async function countUserActive(){
  let result = await global.models.UsersModel.count({
    where:{
      status:"active"
    }
  })
  return result
}


module.exports = {countUser,countUserActive}