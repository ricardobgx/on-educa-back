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

/* Rotas */

// Usuarios

import studentRoutes from './routes/student.routes';
import teacherRoutes from './routes/teacher.routes';

// Materiais escolares

import teachingTypeRoutes from './routes/teachingtype.routes';
import schoolGradeRoutes from './routes/schoolgrade.routes';
import subjectRoutes from './routes/subject.routes';
import unityRoutes from './routes/unity.routes';
import contentRoutes from './routes/content.routes';
import questionRoutes from './routes/question.routes';
import alternativeRoutes from './routes/alternative.routes';

// Duelos

import duelRoutes from './routes/duel.routes';
import duelRoundRoutes from './routes/duelRound.routes';
import duelTeamRoutes from './routes/duelTeam.routes';
import duelTeamParticipationRoutes from './routes/duelTeamParticipation.routes';
import duelRoundQuestionRoutes from './routes/duelRoundQuestion.routes';
import duelQuestionAnswerRoutes from './routes/duelQuestionAnswer.routes';

// Aplicacao

class App {
  app: Express;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    /* Middlewares */

    // Permitir acesso a outras aplicacoes

    this.app.use(cors());

    // Reconhece o objeto de solicitacao como JSON

    this.app.use(express.json());

    // Permite o uso de objetos aninhados, como no JSON

    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    /* Utilizacao das rotas */

    // Usuarios

    this.app.use('/students', studentRoutes);
    this.app.use('/teachers', teacherRoutes);

    // Materiais escolares
    this.app.use('/subjects', subjectRoutes);
    this.app.use('/teachingTypes', teachingTypeRoutes);
    this.app.use('/schoolGrades', schoolGradeRoutes);
    this.app.use('/units', unityRoutes);
    this.app.use('/contents', contentRoutes);
    this.app.use('/questions', questionRoutes);
    this.app.use('/alternatives', alternativeRoutes);

    // Duelos

    this.app.use('/duels', duelRoutes);
    this.app.use('/duelRounds', duelRoundRoutes);
    this.app.use('/duelTeams', duelTeamRoutes);
    this.app.use('/duelTeamParts', duelTeamParticipationRoutes);
    this.app.use('/duelRoundQuestions', duelRoundQuestionRoutes);
    this.app.use('/duelQuestionAnswers', duelQuestionAnswerRoutes);

    // Documentacao

    this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  }
}

export default new App().app;
