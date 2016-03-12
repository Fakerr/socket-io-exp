var express = require('express');
var http = require('http');
var socket = require('socket.io');

var app = express();

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

var server = http.Server(app);
var io = socket(server);

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

server.listen(3000, function() {
	console.log('listening on port 3000');
});

