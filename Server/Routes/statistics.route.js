const StatisticalController = require("../Controllers/statistical.controller.js")
module.exports = function(fastify) {
  fastify.post("/api/v1/statistics/user", StatisticalController.userStatistics)
}