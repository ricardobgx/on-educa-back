import app from './app';
import socket from 'socket.io';
import http from 'http';
import { getCustomRepository } from 'typeorm';
import { StudentWeeklyPerformanceRepository } from './repositories/implementations/StudentWeeklyPerformanceRepository';
import { TeacherWeeklyPerformanceRepository } from './repositories/implementations/TeacherWeeklyPerformanceRepository';

const { PORT } = process.env;
const server = http.createServer(app);

const io = new socket.Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket: socket.Socket) => {
  socket.on('disconnect', () => {
    console.log('[IO: Server] User is disconnected');
  });

  /* Chat */

  // Envia mensagem
  socket.on('chat.message', (msg) => {
    io.emit('chat.message', msg);
  });

  /* Duelos */

  // Iniciar
  socket.on('duel.start', (change) => {
    io.emit(`duel.start:${change.duelId}`);
  });

  // Excluir
  socket.on('duel.delete', (change) => {
    io.emit(`duel.delete:${change.duelId}`);
  });

  // Muda posicao
  socket.on('duel.update-participation', (change) => {
    io.emit(`duel.update-participation:${change.duelId}`, change.data);
  });

  // Estudante entra
  socket.on('duel.new-participation', (change) => {
    io.emit(`duel.new-participation:${change.duelId}`, change.data);
  });

  // Estudante sai
  socket.on('duel.exit-participation', (change) => {
    io.emit(`duel.exit-participation:${change.duelId}`, change.data);
  });

  // Estudante removido
  socket.on('duel.remove-participation', (change) => {
    io.emit(`duel.remove-participation:${change.duelId}`, change.data);
  });

  // Questao respondida
  socket.on('duel.question-answered', (change) => {
    io.emit(`duel.question-answered:${change.duelId}`);
  });

  // Envia mensagem
  socket.on('duel.message', (msg) => {
    io.emit(`duel.message:${msg.duelId}`, msg.data);
  });

  console.log('[IO: Server] A new user is connected');
});

// setTimeout(async () => {
//   const studentWeeklyPerformanceRepository = await getCustomRepository(
//     StudentWeeklyPerformanceRepository
//   );
//   await studentWeeklyPerformanceRepository.resetWeeklyPerformances();
// }, 5000);

// setTimeout(async () => {
//   const teacherWeeklyPerformanceRepository = await getCustomRepository(
//     TeacherWeeklyPerformanceRepository
//   );
//   await teacherWeeklyPerformanceRepository.resetWeeklyPerformances();
// }, 5000);

server.listen(PORT, () => {
  console.log('ON EDUCA - ' + PORT);
});
