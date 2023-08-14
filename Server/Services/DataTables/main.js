
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
  
  static async getByOwners(user_id,limit=5,offset=0){
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
  
  static async create(createBy,name){
    let dt_id = (Math.floor(Math.random()*999999)*Date.now()).toString(16)
    try {
      let dt = await models.DataTables.create({
        dt_id:dt_id,
        name:name,
        createBy:createBy,
        status: "active"
      })
      
      dt.addOwner({
        user_id:createBy
      })
      
      return dt
    } catch (err) {
      throw {
        name: "Action Error",
        message: "Cannot create datatables !"
      }
    }
  }
}