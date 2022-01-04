import 'reflect-metadata';
import express, { Express } from 'express';
import 'express-async-errors';
import cors from 'cors';
import './database';
import swaggerUI from 'swagger-ui-express';
import * as swaggerDefinitionDocument from './swagger.json';
import { paths } from './routes';

// Documentacao da API

const swaggerDocument = { ...swaggerDefinitionDocument, paths };

// Variaveis de ambiente

const { PORT } = process.env;

// Rotas

import studentRoutes from './routes/student.routes';
import teacherRoutes from './routes/teacher.routes';
import subjectRoutes from './routes/subject.routes';
import teachingTypeRoutes from './routes/teachingtype.routes';
import schoolGradeRoutes from './routes/schoolgrade.routes';
import unityRoutes from './routes/unity.routes';
import contentRoutes from './routes/content.routes';
import questionRoutes from './routes/question.routes';
import alternativeRoutes from './routes/alternative.routes';

// Aplicacao

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
    this.app.use('/teachingtypes', teachingTypeRoutes);
    this.app.use('/schoolgrades', schoolGradeRoutes);
    this.app.use('/units', unityRoutes);
    this.app.use('/contents', contentRoutes);
    this.app.use('/questions', questionRoutes);
    this.app.use('/alternatives', alternativeRoutes);
    this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  }
}

export default new App().app;
