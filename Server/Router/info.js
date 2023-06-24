module.exports = function(instance){
	instance.route({
        method: 'GET',
        path: '/info/ver',
        handler: (request, h) => {
            return {
            	time:Date.now(),
            	ver:"0.0.1"
            }
        }
    });
    
    
}