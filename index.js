var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var liveUsers = [];

const port = process.env.PORT || 8080; // uses server env port if exists, else uses default 8080

app.get('/', function(req, res){
	// serve this html file
	res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', function(req, res){
	// serve this css file
	res.sendFile(__dirname + '/style.css');
});

app.get('/func.js', function(req, res){
	// serve this js file
	res.sendFile(__dirname + '/func.js');
});


// upon connection
io.on('connection', function(socket) {

	// func when user submits their chat name
	socket.on('chat name', function(name) {
		socket.chatName = name;
		var joinMsg = name + ' has joined the chat!';

		// go to func.js -> socket.on('chat message')
		io.emit('chat message', joinMsg);



		// update the currently live user list
		liveUsers.push(name);

		// go to func.js -> socket.on('update users')
		io.emit('update users', liveUsers);
	});

	// func to display message
	socket.on('chat message', function(msg) {
		var fullMsg = socket.chatName + ': ' + msg;

		// go to func.js -> socket.on('chat message')
		io.emit('chat message', fullMsg);
	});

	// upon disconnection
	socket.on('disconnect', function() {
		var leaveMsg = socket.chatName + ' has left the chat';

		// go to func.js -> socket.on('chat message')
		io.emit('chat message', leaveMsg);


		// remove user from the currently live user list
		for (var i = 0; i < liveUsers.length; i++) {
			if (socket.chatName === liveUsers[i]) {
				liveUsers.splice(i, 1);

				// go to func.js -> socket.on('update users')
				io.emit('update users', liveUsers);

				return;
			}
		}
	});
});

server.listen(port, function(){
	console.log('listening on ' + port);
});


// func.js is a singular client --> index.js is the server --> index then broadcasts to all clients ('all' func)