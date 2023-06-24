const path = require("path")
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const socketio = require("socket.io");
const router = require("./Server/Router/main.js");
const socket = require("./Server/Socket/main.js");

const init = async () => {
	const server = Hapi.server({
		port: 3000,
		host: 'localhost',
		routes: {
			"cors": {
				"origin": ["*"],
				"headers": ["Accept", "Content-Type", "Authorization"],
				"additionalHeaders": ["X-Requested-With"]
			},
			files: {
				relativeTo: path.join(__dirname, './Client')
			}
		}
	});
	await server.register(Inert);
	
	server.route({
		method: 'GET',
		path: '/{param*}',
		handler: {
			directory: {
				path: '.',
				redirectToSlash: true
			}
		}
	});
	
	const io = socketio(server.listener, {
		cors: {
			origin: "*",
			methods: ["GET", "POST"]
		}
	});
	
	router(server);
	socket(io);
	await server.start();
	console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

	console.log(err);
	process.exit(1);
});

init();


