const AuthService = require("../Authentication/auth.js")
const TokenService = require("../Authentication/token.js")
const DatatablesService = require("../DataTables/main.js")
const DatatablesIOSerive = require("../DataTables/io.js")
module.exports = function(fastify) {
	fastify.ready().then(() => {
		fastify.io.on("connection", function(socket) {
			socket.data = {
				auth: null,
				listening: [],
				type: "listen_data_dt"
			}

			socket.on("dt:set_listener", async function(data) {
				socket.data.dt = {
					accessLevel: 0
				}
				try {
					socket.data.auth = await TokenService.verify(
						data.accessToken,
						process.env.ACCESSTOKEN_SECRET
					)
					socket.data.auth.info = await AuthService.user(socket.data.auth.user_id)
				} catch (err) {
					socket.emit("auth_err", err)
					return
				}
				let role = socket.data.auth.info.role
				if (role == "admin") {
					try {
						dt = await DatatablesService.getDataTable(data.dt_id)
						socket.join(`dt_${data.dt_id}`)
						socket.emit("dt:set_listener:success", {
							dt_id: data.dt_id
						})
					} catch (err) {
						socket.emit("action_err", err)
					}
				} else {
					try {
						dt = await DatatablesService.getDataTable(data.dt_id)
						if (dt.isStatuses(["lock", "active"]) && dt.isCreator(socket.data.auth.info)) {
							socket.join(`dt_${data.dt_id}`)
							socket.emit("dt:set_listener:success", {
								dt_id: data.dt_id
							})
						} else if (dt.isStatuses(["active"]) && dt.isOwner(socket.data.auth.info)) {
							socket.join(`dt_${data.dt_id}`)
							socket.emit("dt:set_listener:success", {
								dt_id: data.dt_id
							})
						} else {
							throw {
								name: "Action Error",
								message: "You do not have permission to access this DataTable !"
							}
						}
					} catch (err) {
						socket.emit("action_err", err)
					}
				}
			})


			socket.on("dt:rm_listener", function(data) {
				if (!data.accessToken) {
					socket.emit("auth_err", {
						name: "Auth Error",
						message: "Missing auth information !"
					})
					return
				}
				socket.leave(`dt_${data.dt_id}`)
			})

			socket.on("dt:set_data", function(data) {
				if (!data.accessToken) {
					socket.emit("auth_err", {
						name: "Auth Error",
						message: "Missing auth information !"
					})
					return
				}
				if (socket.rooms.indexOf(`dt_${data.dt_id}`) >= 0) {
					DatatablesIOSerive.write(
						data.dt_id,
						data.key,
						data.by,
						`user:${socket.data.auth.user_id}`
					)

					socket.to(`dt_${data.dt_id}`).emit("data_change", {
						dt_id: data.dt_id,
						key: data.key,
						value: data.value,
						by:`user:${socket.data.auth.user_id}`
					})
				}
			})
			
			
		})
	})
}