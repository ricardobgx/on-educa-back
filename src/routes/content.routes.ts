import { Router } from 'express';
import CreateContentController from '../controllers/content/CreateContentController';
import DeleteContentController from '../controllers/content/DeleteContentController';
import ListContentByUnityController from '../controllers/content/ListContentByUnityController';
import ListContentController from '../controllers/content/ListContentController';
import ShowContentController from '../controllers/content/ShowContentController';
import UpdateContentController from '../controllers/content/UpdateContentController';

const routes = Router();

routes.get('/', ListContentController.handle);
routes.get('/unity/:id', ListContentByUnityController.handle);
routes.get('/:id', ShowContentController.handle);
routes.post('/', CreateContentController.handle);
routes.put('/:id', UpdateContentController.handle);
routes.delete('/:id', DeleteContentController.handle);

export default routes;
