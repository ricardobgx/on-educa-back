import { Router } from 'express';
import CreateUnityController from '../controllers/unity/CreateUnityController';
import DeleteUnityController from '../controllers/unity/DeleteUnityController';
import ListUnityBySubjectController from '../controllers/unity/ListUnityBySubjectController';
import ListUnityController from '../controllers/unity/ListUnityController';
import UpdateUnityController from '../controllers/unity/UpdateUnityController';

const routes = Router();

routes.get('/', ListUnityController.handle);
routes.get('/subject/:id', ListUnityBySubjectController.handle);
routes.post('/', CreateUnityController.handle);
routes.put('/:id', UpdateUnityController.handle);
routes.delete('/:id', DeleteUnityController.handle);

export default routes;
