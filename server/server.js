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

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to chat App',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    //socket.emit emits the message to single connection, but io.emit emits the message to every connection
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('User was Disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
