import { Router } from 'express';
import CreateTeacherController from '../controllers/teacher/CreateTeacherController';
import DeleteTeacherController from '../controllers/teacher/DeleteTeacherController';
import ListTeacherController from '../controllers/teacher/ListTeacherController';
import ShowTeacherController from '../controllers/teacher/ShowTeacherController';
import UpdateTeacherController from '../controllers/teacher/UpdateTeacherController';
import { verifyAuthentication as teacherAuthorization } from '../middlewares/teacher/verifyAuthentication';
import { verifyAuthentication as peopleAuthorization } from '../middlewares/people/verifyAuthentication';

const routes = Router();

routes.get('/', peopleAuthorization, ListTeacherController.handle);
routes.get('/:id', peopleAuthorization, ShowTeacherController.handle);
routes.post('/', CreateTeacherController.handle);
routes.put('/:id', teacherAuthorization, UpdateTeacherController.handle);
routes.delete('/:id', teacherAuthorization, DeleteTeacherController.handle);

export default routes;
