import { Router } from 'express';
import CreateDuelTeamController from '../controllers/duelTeam/CreateDuelTeamController';
import ListDuelTeamByDuelRoundController from '../controllers/duelTeam/ListDuelTeamsByDuelRoundController';
import ListDuelTeamController from '../controllers/duelTeam/ListDuelTeamController';
import ShowDuelTeamController from '../controllers/duelTeam/ShowDuelTeamController';
import UpdateDuelTeamController from '../controllers/duelTeam/UpdateDuelTeamController';

const routes = Router();

routes.get('/', ListDuelTeamController.handle);
routes.get('/duelRound/:id', ListDuelTeamByDuelRoundController.handle);
routes.get('/:id', ShowDuelTeamController.handle);
routes.post('/', CreateDuelTeamController.handle);
routes.put('/:id', UpdateDuelTeamController.handle);

export default routes;
