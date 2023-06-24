const auth = require("../Helpers/Authentication/auth.js")
const token = require("../Helpers/Authentication/token.js")
class AuthController {
	static async login(request, res) {
		let body = request.payload
		let username = body.username
		let password = body.password
		let device = body.device
		device.time = Date.now()
		try {
			let info = await auth.login(username, password)
			let at = await token.generateAccessToken(info)
			let rt = await token.generateRefreshToken(info, device)
			return res.response({
				status: "success",
				info: info,
				tokens: {
					accessToken: at,
					refreshToken: rt
				}
			}).code(200)

		} catch (e) {
			return res.response({
				status: "error",
				err: e
			}).code(400)
		}
	}
	static async register(request, res) {
		let body = request.payload
		let username = body.username
		let password = body.password
		try {
			let info = await auth.register(username, password)
			return res.response({
				status: "success",
				info: info
			}).code(200)
		}
		catch (err) {
			return res.response({
				status: "error",
				err: err
			}).code(400)
		}
	}
	static async getInfo(request, res) {
		if(!request.user){
			return res.response({
				status: "error",
				err: {
					name:"Permission Error",
					message:"No permission to access user information ! "
				}
			}).code(403)
		}
		return res.response({
			status: "success",
			info: request.user
		}).code(200)
	}
	
	static async getNewToken(request,res){
		let body = request.payload
		let rt = body.refreshToken
		try {
			let info = await token.verifyRefreshToken(rt)
			let at = await token.generateAccessToken(info.data)
			return res.response({
				status:"success",
				tokens: {
					accessToken: at,
					refreshToken: rt
				}
			}).code(200)
		} catch (err) {
			return res.response({
				status: "error",
				err: err
			}).code(400)
		}
	}
	
	static async logout(request,res){
		let body = request.payload
		let rt = body.refreshToken
		try {
			await token.removeRefreshToken(rt)
			return res.response({
				status: "success",
			}).code(200)
		} catch (err) {
			return res.response({
				status: "error",
				err: err
			}).code(400)
		}
	}

}

module.exports = AuthController