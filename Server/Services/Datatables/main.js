const AuthService = require("../Authentication/auth.js")
const {generateID} = require("../../utils.js")
class DatatablesService {
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
      await dt.addUser(dt_id)
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
  
  
}

module.exports = DatatablesService