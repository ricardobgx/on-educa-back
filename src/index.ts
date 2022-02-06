import app from './app';
import socket from 'socket.io';
import http from 'http';

const { PORT } = process.env;
const server = http.createServer(app);

const io = new socket.Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket: socket.Socket) => {
  socket.on('chat.message', (msg) => {
    io.emit('chat.message', msg);
  });
  socket.on('disconnect', () => {
    console.log('[IO: Server] User is disconnected');
  });

  console.log('[IO: Server] A new user is connected');
});

server.listen(PORT, () => {
  console.log('ON EDUCA - ' + PORT);
});
