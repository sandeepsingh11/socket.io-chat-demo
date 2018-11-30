$(document).ready(function() {
	var socket = io();

	$('form').submit(function() {
		// go to index.js -> socket.on('chat message')
		socket.emit('chat message', $('#input').val());

		// clear input
		$('#input').val('');

		return false;
	});

	// append message to chat display
	socket.on('chat message', function(msg) {
		$('#messages').append($('<li>').text(msg));
	});
});