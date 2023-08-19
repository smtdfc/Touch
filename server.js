require("dotenv").config()
const path = require("path");
const fastify = require("fastify")({
	logger: false,
	trustProxy: true
});

fastify.register(require("@fastify/formbody"));
fastify.register(require("@fastify/cors"))
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, './Client/dashboard'),
  prefix: '/Client/dashboard/', 
})

global.models ={}
fastify.listen({port:3000, host: "0.0.0.0" },
	function(err, address) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		console.log(`Server is running . . .`);
	}
);