import { Router } from 'express';
import CreateDuelRoundQuestionController from '../controllers/duelRoundQuestion/CreateDuelRoundQuestionController';
import DeleteDuelRoundQuestionController from '../controllers/duelRoundQuestion/DeleteDuelRoundQuestionController';
import ListDuelRoundQuestionByDuelRoundController from '../controllers/duelRoundQuestion/ListDuelRoundQuestionByDuelRoundController';
import ListDuelRoundQuestionController from '../controllers/duelRoundQuestion/ListDuelRoundQuestionController';
import ShowDuelRoundQuestionController from '../controllers/duelRoundQuestion/ShowDuelRoundQuestionController';
import UpdateDuelRoundQuestionController from '../controllers/duelRoundQuestion/UpdateDuelRoundQuestionController';

const routes = Router();

routes.get('/', ListDuelRoundQuestionController.handle);
routes.get('/:id', ShowDuelRoundQuestionController.handle);
routes.get('/duelRound/:id', ListDuelRoundQuestionByDuelRoundController.handle);
routes.post('/', CreateDuelRoundQuestionController.handle);
routes.put('/:id', UpdateDuelRoundQuestionController.handle);
routes.delete('/:id', DeleteDuelRoundQuestionController.handle);

export default routes;
