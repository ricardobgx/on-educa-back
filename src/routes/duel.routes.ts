import { Router } from 'express';
import CreateDuelController from '../controllers/duel/CreateDuelController';
import DeleteDuelController from '../controllers/duel/DeleteDuelController';
import ListDuelsController from '../controllers/duel/ListDuelsController';
import ShowDuelController from '../controllers/duel/ShowDuelController';

const routes = Router();

routes.get('/', ListDuelsController.handle);
routes.get('/:id', ShowDuelController.handle);
routes.post('/', CreateDuelController.handle);
routes.delete('/:id', DeleteDuelController.handle);

export default routes;
