module.exports = function(io){
	io.on("connection",function(socket){
		socket.emit("server info",{
			time:Date.now(),
			ver:"0.0.1"
		})
	})
}