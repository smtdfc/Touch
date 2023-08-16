const DTService = require("../Services/DataTables/main.js")
const AuthService = require("../Services/Authentication/auth.js")
const { generateErrResponse, generateSuccessResponse } = require("../utils.js")

module.exports = class DTController {
  static async list(request, reply) {
    if (!request.user) {
      return generateErrResponse(reply, {
        name: "Permission Error",
        message: "Access has been blocked !"
      })
    }

    if (request.user.role == "admin") {
      try {
        let list = await DTService.getAll(
          request.body.limit ?? 5,
          request.body.offset ?? 0
        )
        return generateSuccessResponse(reply, list)
      } catch (err) {
        return generateErrResponse(reply, err)
      }
    }

    if (request.user.role == "user") {
      try {
        let list = await DTService.getByOwners(
          request.user.user_id,
          request.body.limit ?? 5,
          request.body.offset ?? 0
        )
        return generateSuccessResponse(reply, list)

      } catch (err) {
        return generateErrResponse(reply, err)
      }
    }

  }

  static async create(request, reply) {
    if (!request.user) {
      return generateErrResponse(reply, {
        name: "Permission Error",
        message: "Access has been blocked !"
      })
    }

    try {
      let info = await DTService.create(
        request.user._user,
        request.body.name ?? "no name",
      )
      return generateSuccessResponse(reply, info)
    } catch (err) {
      return generateErrResponse(reply, err)
    }

  }

  static async remove(request, reply) {
    if (!request.user) {
      return generateErrResponse(reply, {
        name: "Permission Error",
        message: "Access has been blocked !"
      })
    }
    if (request.user.role == "admin") {
      try {
        if (!request.body.dt_id) {
          throw {
            name: "Action Error",
            message: "Cannot remove datatables !"
          }
        }

        let results = await DTService.remove(
          request.body.dt_id,
          3
        )

        return generateSuccessResponse(reply, results)
      } catch (err) {
        return generateErrResponse(reply, err)
      }
    }

    if (request.user.role == "user") {
      try {
        if (!request.body.dt_id) {
          throw {
            name: "Action Error",
            message: "Cannot remove datatables !"
          }
        }
        let createBy = await DTService.getCreator(request.body.dt_id)
        if (createBy != request.user.user_id) {
          throw {
            name: "Action Error",
            message: "You do not have permission to delete this table !!"
          }
        }
        let results = await DTService.remove(
          request.body.dt_id,
          2
        )
        return generateSuccessResponse(reply, results)
      } catch (err) {
        return generateErrResponse(reply, err)
      }
    }
  }
  static async info(request, reply) {
    if (!request.user) {
      return generateErrResponse(reply, {
        name: "Permission Error",
        message: "Access has been blocked !"
      })
    }
    if (request.user.role == "admin") {
      try {
        if (!request.body.dt_id) {
          throw {
            name: "Action Error",
            message: "Cannot get info of datatable !"
          }
        }

        let results = await DTService.info(
          request.body.dt_id,
          3
        )

        return generateSuccessResponse(reply, results)
      } catch (err) {
        return generateErrResponse(reply, err)
      }
    }

    if (request.user.role == "user") {
      try {
        if (!request.body.dt_id) {
          throw {
            name: "Action Error",
            message: "Cannot get info of datatable !"
          }
        }

        let res = await DTService.isOwner(request.body.dt_id, request.user.user)
        if (!res) {
          throw {
            name: "Action Error",
            message: "You do not have permission to get info of this table !!"
          }
        }

        let results = await DTService.info(
          request.body.dt_id,
          1
        )
        return generateSuccessResponse(reply, results)
      } catch (err) {
        return generateErrResponse(reply, err)
      }
    }
  }

  static async owners(request, reply) {
    if (!request.user) {
      return generateErrResponse(reply, {
        name: "Permission Error",
        message: "Access has been blocked !"
      })
    }
    if (request.user.role == "admin") {
      try {
        if (!request.body.dt_id) {
          throw {
            name: "Action Error",
            message: "Cannot all owner of datatable !"
          }
        }

        let results = await DTService.owners(
          request.body.dt_id,
          3
        )

        return generateSuccessResponse(reply, results)
      } catch (err) {
        return generateErrResponse(reply, err)
      }
    }

    if (request.user.role == "user") {
      try {
        if (!request.body.dt_id) {
          throw {
            name: "Action Error",
            message: "Cannot get info of datatable !"
          }
        }

        let res = await DTService.isOwner(request.body.dt_id, request.user.user)
        if (!res) {
          throw {
            name: "Action Error",
            message: "You do not have permission to get owners of this table !!"
          }
        }

        let results = await DTService.owners(
          request.body.dt_id,
          1
        )
        return generateSuccessResponse(reply, results)
      } catch (err) {
        return generateErrResponse(reply, err)
      }
    }
  }
  
    static async addOwner(request, reply) {
    if (!request.user) {
      return generateErrResponse(reply, {
        name: "Permission Error",
        message: "Access has been blocked !"
      })
    }
    if (request.user.role == "admin") {
      try {
        if (!request.body.dt_id || !request.body.user_id) {
          throw {
            name: "Action Error",
            message: "Cannot all owner of datatable !"
          }
        }
        
        let results = await DTService.addOwner(
          request.body.dt_id,
          request.body.user_id,
          3
        )

        return generateSuccessResponse(reply, results)
      } catch (err) {
        return generateErrResponse(reply, err)
      }
    }

    if (request.user.role == "user") {
      try {
        if (!request.body.dt_id) {
          throw {
            name: "Action Error",
            message: "Cannot get info of datatable !"
          }
        }

        let createBy = await DTService.getCreator(request.body.dt_id)
        if (createBy != request.user.user_id) {
          throw {
            name: "Action Error",
            message: "You do not have permission to add owner for table !"
          }
        }
        
        let results = await DTService.addOwner(
          request.body.dt_id,
          request.body.user_id,
          2
        )
        
        return generateSuccessResponse(reply, results)
      } catch (err) {
        return generateErrResponse(reply, err)
      }
    }
  }

  static async removeOwner(request, reply) {
    if (!request.user) {
      return generateErrResponse(reply, {
        name: "Permission Error",
        message: "Access has been blocked !"
      })
    }
    if (request.user.role == "admin") {
      try {
        if (!request.body.dt_id || !request.body.user_id) {
          throw {
            name: "Action Error",
            message: "Cannot all owner of datatable !"
          }
        }
        let createBy = await DTService.getCreator(request.body.dt_id)
        if (createBy != request.user.user_id) {
          throw {
            name: "Action Error",
            message: "You do not have permission to remove owner of table !"
          }
        }
        if(createBy == request.body.user_id){
          throw {
            name: "Action Error",
            message: "You are the creator of this datatable !"
          }
        }
        
        let results = await DTService.removeOwners(
          request.body.dt_id,
          request.body.user_id,
          3
        )

        return generateSuccessResponse(reply, results)
      } catch (err) {
        return generateErrResponse(reply, err)
      }
    }

    if (request.user.role == "user") {
      try {
        if (!request.body.dt_id) {
          throw {
            name: "Action Error",
            message: "Cannot get info of datatable !"
          }
        }

        let createBy = await DTService.getCreator(request.body.dt_id)
        if (createBy != request.user.user_id) {
          throw {
            name: "Action Error",
            message: "You do not have permission to remove owner of table !"
          }
        }
        if (createBy == request.body.user_id) {
          throw {
            name: "Action Error",
            message: "You are the creator of this datatable !"
          }
        }
        
        
        let results = await DTService.removeOwners(
          request.body.dt_id,
          request.body.user_id,
          2
        )
        
        return generateSuccessResponse(reply, results)
      } catch (err) {
        return generateErrResponse(reply, err)
      }
    }
  }
}