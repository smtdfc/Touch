const jwt = require("jsonwebtoken");
const AuthController = require("../Controllers/AuthController.js");
module.exports = function(instance) {
	instance.ext('onRequest', function(request, h) {
		let headers = request.headers;
		if (headers.authorization) {
			let authorization = headers.authorization;
			let token = authorization.split(" ")[1];
			if (!token) {
				return h.response({
					status: "error",
					err: {
						name: "Token Error",
						message: "Invalid token !"
					}
				}).code(401).takeover();
			} else {
				try {
					request.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
					request.user = request.user.data ?? {
						type: "anonymous"
					};
					return h.continue;
				} catch (err) {
					let errName = "";
					if (err.name == "TokenExpiredError") {
						errName = "Token expried !";
					} else if (err.name == "JsonWebTokenError") {
						errName = "Invalid token !";
					}
					return h.response({
						status: "error",
						err: {
							name: "Token Error",
							message: `${errName} !`
						}
					}).code(401).takeover();
				}
			}
		}
		return h.continue;
	});

	instance.route({
		method: 'POST',
		path: '/auth/login',
		handler: AuthController.login
	});
	
	instance.route({
		method: 'POST',
		path: '/auth/info',
		handler: AuthController.getInfo
	});
	
	instance.route({
		method: 'POST',
		path: '/auth/register',
		handler: AuthController.register
	});
	
	instance.route({
		method: 'POST',
		path: '/auth/newToken',
		handler: AuthController.getNewToken
	});
	
	instance.route({
		method: 'POST',
		path: '/auth/logout',
		handler: AuthController.logout
	});
};