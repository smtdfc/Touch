const UsersModel = global.models.UsersModel

function isInvaildValue(value){
	return value == undefined || value == null
}

async function login(username, password ){
	if(isInvaildValue(username) || isInvaildValue(password)){
		throw {
			name:"Authentication Error",
			message:"Invalid login information !"
		}
	}
	
	let user = await UsersModel.findOne({
		where:{
			name:username
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