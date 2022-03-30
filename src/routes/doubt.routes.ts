import { Router } from 'express';
import CreateDoubtController from '../controllers/doubt/CreateDoubtController';
import DeleteDoubtController from '../controllers/doubt/DeleteDoubtController';
import ListDoubtByContentController from '../controllers/doubt/ListDoubtByContentController';
import ListDoubtController from '../controllers/doubt/ListDoubtController';
import ShowDoubtController from '../controllers/doubt/ShowDoubtController';
import UpdateDoubtController from '../controllers/doubt/UpdateDoubtController';

const routes = Router();

routes.get('/', ListDoubtController.handle);
routes.get('/:id', ShowDoubtController.handle);
routes.get('/content/:id', ListDoubtByContentController.handle);
routes.post('/', CreateDoubtController.handle);
routes.put('/:id', UpdateDoubtController.handle);
routes.delete('/:id', DeleteDoubtController.handle);

export default routes;
