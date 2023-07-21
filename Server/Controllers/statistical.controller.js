const UserStatistical = require("../Services/Statistical/user.js")
const { generateErrorResponse } = require("../utils.js")

class StatisticalController{
  static async userStatistics(request,reply){
    if (!request.user || user.role != "admin") {
      return generateErrorResponse(reply, 403, "Permission Error", "Access has been blocked ")
    }
    
    let data={
      totalUser:await UserStatistical.countUser(),
      totalUserActive:await UserStatistical.countUserActive(),
    }
    return reply.code(200).send({ data: data })
  }
}

module.exports = StatisticalController