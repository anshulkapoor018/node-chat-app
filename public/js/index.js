var socket = io();
socket.on('connect', function(){
  console.log('Connected to Server');
});

socket.on('disconnect', function(){
  console.log('Disconnected to Server');
});

//custom event listener
socket.on('newMessage', function(message){
  console.log('newMessage', message);
});
