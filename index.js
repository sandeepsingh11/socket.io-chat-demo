var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);


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
	console.log(socket.id);
	io.emit('chat message', 'a user joined the chat!');

	// func when 'send' button is clicked
	socket.on('chat message', function(msg) {
		// go to func.js -> socket.on('chat message')
		io.emit('chat message', msg);
	});

	// upon disconnection
	socket.on('disconnect', function() {
		io.emit('chat message', 'a user left the chat!');
	});
});

server.listen(3000, function(){
	console.log('listening on *:3000');
});