//Load HTTP module
var http = require("http");
var express = require("express");

var app = express();
var server = http.createServer(app);
var io = require("socket.io").listen(server);

users = [];
connections = [];

server.listen(process.env.Port || 8000);
console.log('server running at 8000');
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    socket.on('disconnect', function(){
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    });

    socket.on('send message', function(data) {
        console.log(data);
        io.sockets.emit('new message', {msg: data});
    });
});
