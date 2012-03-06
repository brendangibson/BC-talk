var io = require('socket.io').listen(80);
io.set("origins","brendangibson.com:*, www.brendangibson.com:*");

io.sockets.on('connection', function (socket) {

  socket.on('pageturn', function (data) {
    
    var dataStr = JSON.stringify(data);
    
    console.log("pt data: " + data);
    console.log("pt data: " + dataStr);

    socket.broadcast.send(dataStr);
  });
});