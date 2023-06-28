const DTManageController = require("../Controllers/DTManageController.js");

module.exports = function(instance) {
	instance.route({
		method: 'POST',
		path: '/dt/list',
		handler: DTManageController.getListDT
	});
	
	instance.route({
		method: 'POST',
		path: '/dt/create',
		handler: DTManageController.createDT
	});
	
	instance.route({
		method: 'POST',
		path: '/dt/delete',
		handler: DTManageController.deleteDT
	});
}