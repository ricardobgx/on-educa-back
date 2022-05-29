import { Router } from 'express';
import CreateLeagueController from '../controllers/league/CreateLeagueController';
import DeleteLeagueController from '../controllers/league/DeleteLeagueController';
import ListLeagueController from '../controllers/league/ListLeagueController';
import UpdateLeagueController from '../controllers/league/UpdateLeagueController';

const routes = Router();

routes.get('/', ListLeagueController.handle);
routes.post('/', CreateLeagueController.handle);
routes.put('/:id', UpdateLeagueController.handle);
routes.delete('/:id', DeleteLeagueController.handle);

export default routes;
