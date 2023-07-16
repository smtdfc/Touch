const path = require("path");
const fastify = require("fastify")({
	logger: false,
});

const jsjd = require("./Server/Models/users.model.js")
fastify.register(require("@fastify/static"), {
	root: path.join(__dirname, "public"),
	prefix: "/",
});

fastify.register(require("@fastify/formbody"));
fastify.register(require("@fastify/cors"))
fastify.listen({ host: "0.0.0.0" },
	function(err, address) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		console.log(`Server is running . . .`);
	}
);