const bcrypt = require("bcrypt")
const accountModel = require("../../Models/account.js")

async function hashPassword(plaintextPassword) {
	const hash = await bcrypt.hash(plaintextPassword, 5);
	return hash
}

async function comparePassword(plaintextPassword, hash) {
	const result = await bcrypt.compare(plaintextPassword, hash);
	return result;
}

async function login(username, password) {
	const user = await accountModel.findOne({
		where: {
			username: username
		}
	});
	if (user === null) {
		throw {
			name: "Authentication Error",
			message: "User doesn't exist !"
		}
	} else {
		if (await comparePassword(password,user.password)) {
			return {
				name: user.username,
				role: user.role
			}
		} else {
			throw {
				name: "Authentication Error",
				message: "Incorrect password !"
			}
		}
	}
}

async function getUserInfo(username) {
	const user = await accountModel.findOne({
		where: {
			username: username
		}
	});
	if (user === null) {
		throw {
			type:"Authentication Error",
			message:"User doesn't exist !"
		}
	} else {
		return {
			name: user.username,
			role: user.role
		}

	}
}

async function checkUserExist(username) {
	const user = await accountModel.findOne({
		where: {
			username: username
		}
	});
	if (user === null) {
		return false
	} else {
		return true

	}
}

async function register(username, password) {
	let exist = await checkUserExist(username)
	if (exist) {
		throw {
			name:"Authentication Error",
			message:"User already exists !"
		}
	} else {
		if (username.length <= 4) {
			throw {
				name:"Validation Error",
				message:"Invalid username ! Username must be 4 or more characters !"
			}
		}

		if (password.length <= 4) {
			throw {
				name:"Validation Error",
				message:"Invalid password ! Password must be 4 or more characters!"
			}
		}
		await accountModel.create({
			username: username,
			password: await hashPassword(password),
			role: "user",
			attr: "{}"
		});
		return {
			username: username,
			password: password
		}
	}
}


module.exports = {
	login,
	register,
	checkUserExist,
	getUserInfo
}
