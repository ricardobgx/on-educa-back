import { Router } from 'express';
import CreateManyAlternativesController from '../controllers/alternative/CreateManyAlternativesController';
import CreateAlternativeController from '../controllers/alternative/CreateAlternativeController';
import DeleteAlternativeController from '../controllers/alternative/DeleteAlternativeController';
import ListAlternativesByQuestionController from '../controllers/alternative/ListAlternativesByQuestionController';
import ListAlternativesController from '../controllers/alternative/ListAlternativesController';
import ShowAlternativeController from '../controllers/alternative/ShowAlternativeController';
import UpdateAlternativeController from '../controllers/alternative/UpdateAlternativeController';

const routes = Router();

routes.get('/', ListAlternativesController.handle);
routes.get('/question/:id', ListAlternativesByQuestionController.handle);
routes.get('/:id', ShowAlternativeController.handle);
routes.post('/', CreateAlternativeController.handle);
routes.post('/many', CreateManyAlternativesController.handle);
routes.put('/:id', UpdateAlternativeController.handle);
routes.delete('/:id', DeleteAlternativeController.handle);

export default routes;
