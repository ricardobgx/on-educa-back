import { Router } from 'express';
import CreateDuelQuestionAnswerController from '../controllers/duelQuestionAnswer/CreateDuelQuestionAnswerController';
import DeleteDuelQuestionAnswerController from '../controllers/duelQuestionAnswer/DeleteDuelQuestionAnswerController';
import ListDuelQuestionAnswerController from '../controllers/duelQuestionAnswer/ListDuelQuestionAnswerController';
import ShowDuelQuestionAnswerController from '../controllers/duelQuestionAnswer/ShowDuelQuestionAnswerController';
import UpdateDuelQuestionAnswerController from '../controllers/duelQuestionAnswer/UpdateDuelQuestionAnswerController';

const routes = Router();

routes.get('/', ListDuelQuestionAnswerController.handle);
routes.get('/:id', ShowDuelQuestionAnswerController.handle);
routes.post('/', CreateDuelQuestionAnswerController.handle);
routes.put('/:id', UpdateDuelQuestionAnswerController.handle);
routes.delete('/:id', DeleteDuelQuestionAnswerController.handle);

export default routes;
