module.exports = function(instance){
	instance.route({
        method: 'POST',
        path: '/test/echo',
        handler: (request, h) => {
            return {
            	...request.payload
            }
        }
    });
    
    
}