const DTController = require("../../Controllers/admin/dt.controller.js")
module.exports = function(fastify) {
  fastify.post("/api/v1/admin/dt/create",DTController.create)
  fastify.post("/api/v1/admin/dt/getAll",DTController.getAll)
  fastify.post("/api/v1/admin/dt/getByUser",DTController.getList)
  fastify.post("/api/v1/admin/dt/remove",DTController.remove)
}