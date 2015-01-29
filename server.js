var http = require('http');
var express = require('express');
var path = require('path');


var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  console.log('got request for /');
  res.render('page');
});


var server = http.createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(socket) {
  socket.on('gamepad', function(data) {
    console.dir(data);
  });
});
server.listen(3001);

console.log("server listening on port 3001");

