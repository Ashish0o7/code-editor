const express = require('express');
const http = require('http');
const socketIO   = require('socket.io');
const cors  = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
  },
});
const getUsersInRoom = (roomId) => {
  const usersInRoom = [];
  const clients = io.sockets.adapter.rooms.get(roomId);
  if (clients) {
    clients.forEach((clientId) => {
      const clientSocket = io.sockets.sockets.get(clientId);
      if (clientSocket) {
        usersInRoom.push(clientSocket.data.username);
      }
    });
  }
  return usersInRoom;
};

io.on('connection', (socket) => {
  console.log('A user has connected.');
    
  socket.on('disconnect', () => {
    console.log('A user has disconnected.');
  });

  socket.on('joinRoom', ({ roomId, username }) => {
    socket.join(roomId);
    console.log(`${username} has joined room ${roomId}.`);
    
    io.to(roomId).emit('users', getUsersInRoom(roomId));
  });

  socket.on('newMessage', (message) => {
    io.to(message.roomId).emit('newMessage', message);
  });

  socket.on('code', ({ roomId, code }) => {
    socket.to(roomId).broadcast.emit('code', code);
  });
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
