import { Router } from 'express';
import CreateDuelRoundController from '../controllers/duelRound/CreateDuelRoundController';
import DeleteDuelRoundController from '../controllers/duelRound/DeleteDuelRoundController';
import ListDuelRoundController from '../controllers/duelRound/ListDuelRoundController';
import ShowDuelRoundController from '../controllers/duelRound/ShowDuelRoundController';
import StartDuelRoundController from '../controllers/duelRound/StartDuelRoundController';
import UpdateDuelRoundController from '../controllers/duelRound/UpdateDuelRoundController';

const routes = Router();

routes.get('/', ListDuelRoundController.handle);
routes.get('/:id', ShowDuelRoundController.handle);
routes.post('/', CreateDuelRoundController.handle);
routes.put('/:id', UpdateDuelRoundController.handle);
routes.put('/start/:id', StartDuelRoundController.handle);
routes.delete('/:id', DeleteDuelRoundController.handle);

export default routes;
