import { Router } from 'express';
import CreateDuelTeamParticipationController from '../controllers/duelTeamParticipation/ParticipateInDuelController';
import ListDuelTeamParticipationsByDuelTeamController from '../controllers/duelTeamParticipation/ListDuelTeamParticipationsByDuelTeamController';
import ListDuelTeamParticipationsController from '../controllers/duelTeamParticipation/ListDuelTeamParticipationsController';
import ShowDuelTeamParticipationController from '../controllers/duelTeamParticipation/ShowDuelTeamParticipationController';
import UpdateDuelTeamParticipationController from '../controllers/duelTeamParticipation/UpdateDuelTeamParticipationController';
import ParticipateInDuelController from '../controllers/duelTeamParticipation/ParticipateInDuelController';
import ChangeDuelTeamPositionController from '../controllers/duelTeamParticipation/ChangeDuelTeamPositionController';
import ExitDuelTeamParticipationController from '../controllers/duelTeamParticipation/ExitDuelTeamParticipationController';

const routes = Router();

routes.get('/', ListDuelTeamParticipationsController.handle);
routes.get(
  '/duelTeam/:id',
  ListDuelTeamParticipationsByDuelTeamController.handle
);
routes.get('/:id', ShowDuelTeamParticipationController.handle);
routes.post('/', CreateDuelTeamParticipationController.handle);
routes.post('/duel', ParticipateInDuelController.handle);
routes.put('/changePosition', ChangeDuelTeamPositionController.handle);
routes.put(
  '/removeParticipant/:id',
  ExitDuelTeamParticipationController.handle
);
routes.put('/:id', UpdateDuelTeamParticipationController.handle);

export default routes;
