import 'reflect-metadata';
import express, { Express } from 'express';
import 'express-async-errors';
import cors from 'cors';
import './database';

// Rotas

import studentRoutes from './entities/Student/routes';
import teacherRoutes from './entities/Teacher/routes';
import subjectRoutes from './entities/Subject/routes';

class App {
  app: Express;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use('/students', studentRoutes);
    this.app.use('/teachers', teacherRoutes);
    this.app.use('/subjects', subjectRoutes);
  }
}

export default new App().app;