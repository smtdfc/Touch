module.exports = class DTService {
  static async getAll(limit = 5, offset = 0) {
    try {
      let list = await models.DataTables.findAll({
        limit: limit,
        offset: offset,
        raw: true
      })
      return list
    } catch (err) {
      throw {
        name: "Action Error",
        message: "Cannot get list datatables !"
      }
    }
  }

  static async getByOwners(user_id, limit = 5, offset = 0) {
    try {
      let list = await models.DataTables.findAll({
        includes: {
          model: models.Users,
          where: {
            user_id: user_id
          }
        },
        limit: limit,
        offset: offset,
        raw: true
      })
      return list
    } catch (err) {
      throw {
        name: "Action Error",
        message: "Cannot get list datatables !"
      }
    }
  }

  static async create(createBy, name) {
    let dt_id = (Math.floor(Math.random() * 999999) * Date.now()).toString(16)
    try {
      let dt = await models.DataTables.create({
        dt_id: dt_id,
        name: name,
        createBy: createBy.user_id,
        status: "active"
      })

      dt.addOwner(createBy)

      return dt
    } catch (err) {
      throw {
        name: "Action Error",
        message: "Cannot create datatables !"
      }
    }
  }

  static async remove(dt_id,accessLevel = 0) {

    let dt = await models.DataTables.findOne({
      where: {
        dt_id: dt_id
      }
    })
    if (dt) {
      if (dt.status == "banned" && accessLevel != 3) {
        throw {
          name: "Action Error",
          message: "Datatable has been banned !"
        }
      }

      if (dt.status == "locked" && accessLevel != 2) {
        throw {
          name: "Action Error",
          message: "Datatable has been locked !"
        }
      }
      
      await dt.destroy()
      return dt
    } else {
      throw {
        name: "Action Error",
        message: "Datatable doesn't exist !"
      }
    }
  }

  static async info(dt_id, accessLevel=0) {
    let dt = await models.DataTables.findOne({
      where: {
        dt_id: dt_id
      }
    })
    if (dt) {
      if (dt.status == "banned" && accessLevel!=3) {
        throw {
          name: "Action Error",
          message: "Datatable has been banned !"
        }
      }

      if (dt.status == "locked" && accessLevel < 1) {
        throw {
          name: "Action Error",
          message: "Datatable has been locked !"
        }
      }

      return dt
    } else {
      throw {
        name: "Action Error",
        message: "Datatable doesn't exist !"
      }
    }

  }

  static async isOwner(dt_id, user_id) {
    let dt = await models.DataTables.findOne({
      where: {
        dt_id: dt_id
      },
      includes: {
        model: models.Users,
        where: {
          user_id: user_id
        }
      },
      raw: true
    })

    if (!dt) return false
    return true
  }

  static async getCreator(dt_id, accessLevel = 0) {

    let dt = await models.DataTables.findOne({
      where: {
        dt_id: dt_id
      },
      attributes: ["status", "createBy"],
      raw: true
    })
    if (dt) {
      if (dt.status == "banned" && accessLevel != 3) {
        throw {
          name: "Action Error",
          message: "Datatable has been banned !"
        }
      }

      if (dt.status == "locked" && accessLevel < 1) {
        throw {
          name: "Action Error",
          message: "Datatable has been locked !"
        }
      }

      return dt.createBy
    } else {
      throw {
        name: "Action Error",
        message: "Datatable doesn't exist !"
      }
    }


  }
}