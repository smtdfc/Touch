const configs = require("../config.js")
const AuthController = require("../Controllers/auth.controller.js")
const AuthService = require("../Services/Authentication/auth.js")
const { generateErrResponse, generateSuccessResponse } = require("../utils.js")


module.exports = function(fastify) {
	fastify.post(`/api/v${configs.ver}/auth/login`, AuthController.login)
	fastify.post(`/api/v${configs.ver}/auth/info`, AuthController.info)
	fastify.post(`/api/v${configs.ver}/auth/token`, AuthController.token)
	fastify.post(`/api/v${configs.ver}/auth/logout`, AuthController.logout)
	/*
	fastify.post(`/api/v${configs.ver}/datatables/list`, getUser(), DTController.list)
	fastify.post(`/api/v${configs.ver}/datatables/create`, getUser(), DTController.create)
	fastify.post(`/api/v${configs.ver}/datatables/remove`, getUser(), DTController.remove)
	fastify.post(`/api/v${configs.ver}/datatables/info`, getUser(), DTController.info)
	fastify.post(`/api/v${configs.ver}/datatables/owners`, getUser(), DTController.owners)
	fastify.post(`/api/v${configs.ver}/datatables/owners/remove`, getUser(), DTController.removeOwner)
	fastify.post(`/api/v${configs.ver}/datatables/owners/add`, getUser(), DTController.addOwner)
*/
}