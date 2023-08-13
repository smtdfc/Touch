module.exports = class DTService{
  static async getAll(limit=5,offset=0){
    try {
      let list = await models.DataTables.findAll({
        limit:limit,
        offset:offset,
        raw:true
      })
      return list
    } catch (err) {
      throw{
        name:"Action Error",
        message:"Cannot get list datatables !"
      }
    }
  }
  
  static getByOwners(user_id,limit=5,offset=0){
    try {
      let list = await models.DataTables.findAll({
        includes:{
          model: models.Users,
          where:{
            user_id:user_id
          }
        },
        limit:limit,
        offset:offset,
        raw:true
      })
      return list
    } catch (err) {
      throw {
        name: "Action Error",
        message: "Cannot get list datatables !"
      }
    }
  }
}