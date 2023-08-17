const fastifySocketIO = require("fastify-socket.io");

module.exports = function(fastify){
  fastifyIO.register(fastifySocketIO,{
    cors:{
      origin:"*"
    }
  });
}

