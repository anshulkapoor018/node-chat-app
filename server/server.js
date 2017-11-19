//Required Libraries
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server); // used to communicate between server and client

//middleware to join the public folder
app.use(express.static(publicPath));


//event listening on io
io.on('connection', (socket) => {
  console.log('New User was Connected');

  //emit creates the event
  socket.emit('newMessage',{
    from: 'Ashwini',
    text: 'wassup',
    createdAt: 123123
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  })

  socket.on('disconnect', () => {
    console.log('User was Disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
