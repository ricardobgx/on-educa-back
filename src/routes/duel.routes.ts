import { Router } from 'express';
import CreateDuelController from '../controllers/duel/CreateDuelController';
import ListDuelsController from '../controllers/duel/ListDuelsController';

const routes = Router();

routes.get('/', ListDuelsController.handle);
routes.post('/', CreateDuelController.handle);

export default routes;
