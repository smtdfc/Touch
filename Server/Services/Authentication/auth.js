const UsersModel = require("../../Models/users.model.js")


async function login(username, password ){
	let user = await UsersModel.findOne({
		where:{
			name:name
		}
	})
	if(!user){
		throw {
			name:"Authentication Error",
			message:"User does not exist !"
		}
	}else{
		if(password == user.password){
			return {
				id:user.userID,
				name:user.name,
				role:user.role,
				status:user.status
			}
		}else{
			throw {
				name: "Authentication Error",
				message: "Incorrect password !"
			}
		}
	}
}

module.exports ={
	login
}