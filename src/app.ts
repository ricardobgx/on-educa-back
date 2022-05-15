import 'reflect-metadata';
import express, { Express } from 'express';
import 'express-async-errors';
import cors from 'cors';
import './database';
import swaggerUI from 'swagger-ui-express';
import * as swaggerDefinitionDocument from './swagger.json';
import { paths } from './routes';
import path from 'path';

import exceptionsHandle from './middlewares/handleExceptions';

// Documentacao da API

const swaggerDocument = { ...swaggerDefinitionDocument, paths };

/* Rotas */

// Usuarios

import peopleRoutes from './routes/people.routes';
import studentRoutes from './routes/student.routes';
import teacherRoutes from './routes/teacher.routes';

// Amizade

import friendRequestRoutes from './routes/friendRequest.routes';

// Desempenho

import studentWeeklyPerformanceRoutes from './routes/studentWeeklyPerformance.routes';
import teacherWeeklyPerformanceRoutes from './routes/teacherWeeklyPerformance.routes';

// Conquistas

import achievementRoutes from './routes/achievement.routes';
import achievementLevelRoutes from './routes/achievementLevel.routes';
import achievementProgressRoutes from './routes/achievementProgress.routes';

// Conversas

import chatRoutes from './routes/chat.routes';
import messageRoutes from './routes/message.routes';

// Materiais escolares

import teachingTypeRoutes from './routes/teachingtype.routes';
import schoolGradeRoutes from './routes/schoolgrade.routes';
import subjectRoutes from './routes/subject.routes';
import unityRoutes from './routes/unity.routes';
import contentRoutes from './routes/content.routes';
import questionRoutes from './routes/question.routes';
import alternativeRoutes from './routes/alternative.routes';
import doubtRoutes from './routes/doubt.routes';
import doubtCommentRoutes from './routes/doubtComment.routes';

// Duelos

import duelRoutes from './routes/duel.routes';
import duelRoundRoutes from './routes/duelRound.routes';
import duelTeamRoutes from './routes/duelTeam.routes';
import duelTeamParticipationRoutes from './routes/duelTeamParticipation.routes';
import duelRoundQuestionRoutes from './routes/duelRoundQuestion.routes';
import duelQuestionAnswerRoutes from './routes/duelQuestionAnswer.routes';

// Imagens

import imagesRoute from './routes/image.routes';

// Aplicacao

class App {
  app: Express;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.exceptionHandles();
  }

  /**
   * Define os middlewares que devem ser usados em todas as requisicoes e res-
   * postas
   */
  middlewares() {
    /* Middlewares */

    // Permitir acesso a outras aplicacoes

    this.app.use(cors({ origin: '*' }));

    // Reconhece o objeto de solicitacao como JSON

    this.app.use(express.json());

    // Permite o uso de objetos aninhados, como no JSON

    this.app.use(express.urlencoded({ extended: true }));
  }

  exceptionHandles() {
    // Tratamento de excecoes

    this.app.use(exceptionsHandle);
  }

  /**
   * Define as rotas da aplicacao
   */
  routes() {
    // Usuarios
    this.app.use('/peoples', peopleRoutes);
    this.app.use('/students', studentRoutes);
    this.app.use('/teachers', teacherRoutes);

    // Amizade

    this.app.use('/friendRequests', friendRequestRoutes);

    // Desempenho
    this.app.use('/studentWeeklyPerformances', studentWeeklyPerformanceRoutes);
    this.app.use('/teacherWeeklyPerformances', teacherWeeklyPerformanceRoutes);

    // Conquistas
    this.app.use('/achievements', achievementRoutes);
    this.app.use('/achievementLevels', achievementLevelRoutes);
    this.app.use('/achievementProgress', achievementProgressRoutes);

    // Conversas
    this.app.use('/chats', chatRoutes);
    this.app.use('/messages', messageRoutes);

    // Materiais escolares
    this.app.use('/subjects', subjectRoutes);
    this.app.use('/teachingTypes', teachingTypeRoutes);
    this.app.use('/schoolGrades', schoolGradeRoutes);
    this.app.use('/units', unityRoutes);
    this.app.use('/contents', contentRoutes);
    this.app.use('/questions', questionRoutes);
    this.app.use('/alternatives', alternativeRoutes);
    this.app.use('/doubts', doubtRoutes);
    this.app.use('/doubtComments', doubtCommentRoutes);

    // Duelos
    this.app.use('/duels', duelRoutes);
    this.app.use('/duelRounds', duelRoundRoutes);
    this.app.use('/duelTeams', duelTeamRoutes);
    this.app.use('/duelTeamParts', duelTeamParticipationRoutes);
    this.app.use('/duelRoundQuestions', duelRoundQuestionRoutes);
    this.app.use('/duelQuestionAnswers', duelQuestionAnswerRoutes);

    // Imagens

    this.app.use('/images', imagesRoute);

    // Uploads

    this.app.use(
      '/uploads',
      express.static(path.join(__dirname, '..', 'uploads'))
    );

    // Documentacao
    this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  }
}

export default new App().app;
