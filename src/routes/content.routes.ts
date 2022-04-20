import { Router } from 'express';
import CreateContentController from '../controllers/content/CreateContentController';
import DeleteContentController from '../controllers/content/DeleteContentController';
import ListContentByUnityController from '../controllers/content/ListContentByUnityController';
import ListContentController from '../controllers/content/ListContentController';
import ShowContentController from '../controllers/content/ShowContentController';
import UpdateContentController from '../controllers/content/UpdateContentController';
import { verifyAuthentication as teacherAuthorization } from '../middlewares/teacher/verifyAuthentication';
import { verifyAuthentication as peopleAuthorization } from '../middlewares/people/verifyAuthentication';

const routes = Router();

routes.get('/', peopleAuthorization, ListContentController.handle);
routes.get(
  '/unity/:id',
  peopleAuthorization,
  ListContentByUnityController.handle
);
routes.get('/:id', peopleAuthorization, ShowContentController.handle);
routes.post('/', teacherAuthorization, CreateContentController.handle);
routes.put('/:id', teacherAuthorization, UpdateContentController.handle);
routes.delete('/:id', teacherAuthorization, DeleteContentController.handle);

export default routes;
