const {  DataTypes } = require("sequelize")
const { user } = require("../Authentication/auth.js")

function defineDTModel(dt_id){
  let model = models.conn.touchDatatablesDB.define(`dt_${dt_id}`,{
    key:{
      type:DataTypes.TEXT
    },
    value:{
      type:DataTypes.TEXT
    },
    timestamp:{
      type:DataTypes.TEXT
    },
    by:{
      type:DataTypes.TEXT
    }
  },{
    freezeTableName: true,
  timestamps: false,
  })
  return model
}

async function createDTModel(dt_id){
  let model = defineDTModel(dt_id)
  await model.sync()
  return model
}

class DataTable{
	constructor(dt){
		this.dt = dt
	}
	
	info(){
		return this.dt
	}
	
	isStatuses(statuses=[]){
		return statuses.includes(this.dt.status)
	}
	
	isCreator(user) {
		return this.dt.createBy == user.user_id
	}

	async  isOwner(user){
		return await this.dt.hasOwner(user)
	}
	
	async remove(){
		let dt = await defineDTModel(this.dt.dt_id)
		await dt.drop()
		return await this.dt.destroy()
	}
	
	async listOwner(){
		return await this.dt.getOwner({
			attributes:["user_id","name"]
		})
	}
	
	async addOwner(user){
		if(this.dt.hasOwner(user)){
			throw{
				name:"Action Error",
				message:"Owner already exists !"
			}
		}else{
			await this.dt.addOwner(user)
			return{
				dt:this.dt,
				owner:owner
			}
		}
	}
	
	async removeOwner(user){
	  if(user.user_id == this.dt.createBy){
	    throw {
	      name: "Action Error",
	      message: "You cannot delete yourself because you are the creator of this DataTable ! !"
	    }
	  }
		if (this.dt.hasOwner(user)) {
			await this.dt.removeOwner(user)
			return this.dt
		} else {
			throw {
				name: "Action Error",
				message: "Owner doesn't exist !"
			}
		}
	}
}

module.exports.getDataTable= async function(dt_id){
	let dt = await models.DataTables.findOne({
		where:{
			dt_id:dt_id
		}
	})
	
	if (!dt) {
		throw{
			name:"Action Error",
			message:"DataTable doesn't exist !"
		}
	}else{
		return new DataTable(dt)
	}
}

module.exports.getAllDataTable =async function(limit=5,offset=0){
	let list = await models.DataTables.findAll({
		limit,
		offset
	})
	
	return list
}

module.exports.createDataTable =async function(name, creator){
	let dt_id = (Math.floor(Math.random()*99999)*Date.now()).toString(16)
	let dt = await models.DataTables.create({
		dt_id:dt_id,
		name:name,
		createBy:creator.user_id,
		status:"active"
	})
	await createDTModel(dt_id)
	await dt.addOwner(creator)
	return  new DataTable(dt)
}