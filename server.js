// const http = require('http');
// const { Server } = require('socket.io');
import http from "http";
import {Server} from "socket.io";

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected to id ${socket.id}`);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.roomId).emit('receive_message', {
      roomId: data.roomId,
      message: data.message,
      senderId: socket.id,
    });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected ${socket.id}`);
  });
});

const port = Number(process.env.SOCKET_PORT) || 3001;

httpServer.listen(port, () => {
  console.log(`Socket running on port ${port}`);
});
