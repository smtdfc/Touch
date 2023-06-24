const jwt = require("jsonwebtoken")
const refreshTokentModel = require("../../Models/token.js")

async function generateToken(payload, secret, expiresIn) {
	return jwt.sign(payload, secret, {
		expiresIn: expiresIn
	})
}

async function verifyToken(token, secret) {
	try {
		return jwt.verify(token, secret)
	} catch (err) {
		if (err.name == "TokenExpiredError") {
			throw {
				name: "Token Error",
				message: "Token expried !"
			}
		} else if (err.name == "JsonWebTokenError") {
			throw {
				name: "Token Error",
				message: "Invalid token !"
			}
		}
	}
}

async function generateAccessToken(payload) {
	return await generateToken({
			type: "Access Token",
			data: payload
		},
		process.env.ACCESS_TOKEN_SECRET,
		"2h"
	)
}


async function generateRefreshToken(payload, device) {
	let token = await generateToken({
			type: "Refresh Token",
			data: payload
		},
		process.env.REFRESH_TOKEN_SECRET,
		"10d"
	)
	await refreshTokentModel.create({
		token: token,
		device: JSON.stringify(device),
		loginAt: device.time
	})

	return token
}


async function verifyAccessToken(token) {
	return await verifyToken(token, process.env.ACCESS_TOKEN_SECRET)
}

async function verifyRefreshToken(token) {
	let tok = await refreshTokentModel.findOne({
		where: {
			token: token
		}
	});

	if (!tok) {
		throw {
			name:"Token Error",
			message:"Invalid token !"
		}
	} else {
		return await verifyToken(token, process.env.REFRESH_TOKEN_SECRET)
	}
}

async function removeRefreshToken(token){
	await refreshTokentModel.destroy({
		where: {
			token: token
		}
	});
	return 
}

module.exports = {
	generateToken,
	verifyToken,
	generateAccessToken,
	generateRefreshToken,
	verifyAccessToken,
	verifyRefreshToken,
	removeRefreshToken
}