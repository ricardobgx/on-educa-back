import { Router } from 'express';
import CreateDuelController from '../controllers/duel/CreateDuelController';
import ListDuelsController from '../controllers/duel/ListDuelsController';
import ShowDuelController from '../controllers/duel/ShowDuelController';

const routes = Router();

routes.get('/', ListDuelsController.handle);
routes.get('/:id', ShowDuelController.handle);
routes.post('/', CreateDuelController.handle);

export default routes;
