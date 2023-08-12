const path = require("path")
module.exports ={
  touch_db:{
    logging: false,
    dialect: 'sqlite',
    storage: path.join(__dirname, "../../Data/db/touchdb.db")
  }
}