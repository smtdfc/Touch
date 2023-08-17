const fastifySocketIO = require("fastify-socket.io");

module.exports = function(fastify){
  fastify.register(fastifySocketIO,{
    cors:{
      origin:"*"
    }
  });
}

