const path = require("path");

const verifyToken = require ("./Server/Services/Authentication/verifyToken.js")
const fastify = require("fastify")({
	logger: false,
	trustProxy: true
});

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, './Client/dashboard'),
  prefix: '/Client/dashboard/', 
})

fastify.on("preHandler",verifyToken)
global.models ={}
require("./Server/Models/main.js")
require('dotenv').config()
const router = require("./Server/Routes/main.js")

fastify.register(require("@fastify/formbody"));
fastify.register(require("@fastify/cors"))
router(fastify)


fastify.listen({port:3000, host: "0.0.0.0" },
	function(err, address) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		console.log(`Server is running . . .`);
	}
);