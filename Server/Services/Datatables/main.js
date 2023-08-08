const AuthService = require("../Authentication/auth.js")
const {generateID} = require("../../utils.js")
class DatatablesService {
  static async getDT(dt_id,force){
    let dt = await models.Datatables.findOne({
      where: {
        dt_id: dt_id
      }
    })
    
    if (!dt) {
      throw {
        name: "Datatable Error",
        message: "Datatable does not exist "
      }
    } else {
      if (dt.status == "lock" && !force) {
        throw {
          name: "Datatable Error",
          message: "Datatable has been locked "
        }
      }
    }
    
    return dt
  }
  static async getByUserId(user_id, limit = 5, offset = 0) {

  }

  static async getAll(limit = 5, offset = 0) {
    try {
      let result = await models.Datatables.findAll({
        limit: limit,
        offset: offset
      })
      return result
    } catch (err) {
      throw {
        name: "Action Error",
        message: "Cannot get list datatables !"
      }
    }
  }
  
  static async create(user_id,dt_name){
    let user = await AuthService.findUser(user_id)
    try {
      let dt_id = generateID()
      let dt = await models.Datatables.create({
        dt_id:dt_id,
        name:dt_name,
        status:"active"
      })
      await dt.addUser(user)
      return {
        dt_id:dt_id,
        name:dt_name,
        status:"active"
      }
    } catch (err) {
      throw {
        name: "Action Error",
        message: "Cannot create datatable !"
      }
    }
  }
  
  static async info(dt_id){
    let dt = await this.getDT(dt_id,force)
    try {
      
      return {
        dt_id: dt.dt_id,
        name:dt.name,
        status:dt.status,
        owners: await dt.getUsers({
          attributes: ['name','user_id'],
        })
      }
      
    } catch (err) {
      throw {
        name: "Action Error",
        message: "Cannot remove datatable !"
      }
    }
  }
  
  static async remove(dt_id,force = false) {
    let dt = await this.getDT(dt_id,force)
    try {
      await dt.setUsers([])
      await dt.destroy()
      return {
        dt_id: dt_id,
      }
    } catch (err) {
      throw {
        name: "Action Error",
        message: "Cannot remove datatable !"
      }
    }
  }
  
}

module.exports = DatatablesService