import { Router } from 'express';
import CreatePracticeController from '../controllers/practice/CreatePracticeController';
import DeletePracticeController from '../controllers/practice/DeletePracticeController';
import ListPracticeController from '../controllers/practice/ListPracticeController';
import ShowPracticeController from '../controllers/practice/ShowPracticeController';

const routes = Router();

routes.get('/', ListPracticeController.handle);
routes.get('/:id', ShowPracticeController.handle);
routes.post('/', CreatePracticeController.handle);
routes.delete('/:id', DeletePracticeController.handle);

export default routes;
