import { Router } from 'express';
import CreateQuestionController from '../controllers/question/CreateQuestionController';
import DeleteQuestionController from '../controllers/question/DeleteQuestionController';
import GetPracticeQuestionController from '../controllers/question/GetPracticeQuestionController';
import ListQuestionByContentController from '../controllers/question/ListQuestionByContentController';
import ListQuestionController from '../controllers/question/ListQuestionController';
import ShowQuestionController from '../controllers/question/ShowQuestionController';
import UpdateQuestionController from '../controllers/question/UpdateQuestionController';

const routes = Router();

routes.get('/', ListQuestionController.handle);
routes.get('/:id', ShowQuestionController.handle);
routes.get('/content/:id', ListQuestionByContentController.handle);
routes.get(
  '/practiceQuestions/:contentId',
  GetPracticeQuestionController.handle
);
routes.post('/', CreateQuestionController.handle);
routes.put('/:id', UpdateQuestionController.handle);
routes.delete('/:id', DeleteQuestionController.handle);

export default routes;
