import { Router } from 'express';
import CreateDuelTeamParticipationByDuelController from '../controllers/duelTeamParticipation/CreateDuelTeamParticipationByDuelController';
import CreateDuelTeamParticipationController from '../controllers/duelTeamParticipation/CreateDuelTeamParticipationController';
import ListDuelTeamParticipationsByDuelTeamController from '../controllers/duelTeamParticipation/ListDuelTeamParticipationsByDuelTeamController';
import ListDuelTeamParticipationsController from '../controllers/duelTeamParticipation/ListDuelTeamParticipationsController';
import ShowDuelTeamParticipationController from '../controllers/duelTeamParticipation/ShowDuelTeamParticipationController';
import UpdateDuelTeamParticipationController from '../controllers/duelTeamParticipation/UpdateDuelTeamParticipationController';

const routes = Router();

routes.get('/', ListDuelTeamParticipationsController.handle);
routes.get(
  '/duelTeam/:id',
  ListDuelTeamParticipationsByDuelTeamController.handle
);
routes.get('/:id', ShowDuelTeamParticipationController.handle);
routes.post('/', CreateDuelTeamParticipationController.handle);
routes.post('/duel', CreateDuelTeamParticipationByDuelController.handle);
routes.put('/:id', UpdateDuelTeamParticipationController.handle);

export default routes;
