const path = require("path");
const fastify = require("fastify")({
	logger: false,
	trustProxy: true
});

const authTokenVerify = require("./Server/Services/Authentication/authTokenVerify.js")
const router = require("./Server/Routes/main.js")

fastify.register(require("@fastify/formbody"));
fastify.register(require("@fastify/cors"))
fastify.addHook('preHandler',authTokenVerify)
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