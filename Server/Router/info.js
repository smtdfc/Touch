module.exports = function(instance){
	instance.route({
        method: 'POST',
        path: '/info/ver',
        handler: (request, h) => {
            return {
            	server:'touch',
            	time:Date.now(),
            	ver:"0.0.1"
            }
        }
    });
    
    
}