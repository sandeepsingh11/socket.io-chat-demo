$(document).ready(function() {
	var socket = io();

	// set user UI to prompt user name
	promptUserDisplay();

	// send chat name info
	$('#chatNameForm').submit(function() {
		// go to index.js -> socket.on('chat name')
		socket.emit('chat name', $('#chatName').val());

		$('#getUser').css('display', 'none');

		return false;
	});	

	// send message info
	$('#messageForm').submit(function() {
		// go to index.js -> socket.on('chat message')
		socket.emit('chat message', $('#message').val());

		// clear input
		$('#message').val('');

		return false;
	});

	// append message to chat display
	socket.on('chat message', function(msg) {
		$('#messages').append($('<li>').text(msg));

		var scrollHere = document.getElementById('scrollHere');
		scrollHere.scrollIntoView(false);
	});
});

function promptUserDisplay() {
	var winWidth = $(window).width();
	var winHeight = $(window).height();

	var userPrompt = $('#getUser');
	$(userPrompt).css('display', 'block');
	$(userPrompt).css('width', winWidth);
	$(userPrompt).css('height', winHeight);
}