import { Router } from 'express';
import AuthenticationTeacherController from '../controllers/teacher/AuthenticationTeacherController';
import CreateTeacherController from '../controllers/teacher/CreateTeacherController';
import DeleteTeacherController from '../controllers/teacher/DeleteTeacherController';
import ListTeacherController from '../controllers/teacher/ListTeacherController';
import ShowTeacherController from '../controllers/teacher/ShowTeacherController';
import UpdateTeacherController from '../controllers/teacher/UpdateTeacherController';
import { verifyAuthentication as teacherAuthorization } from '../middlewares/teacher/verifyAuthentication';
import { verifyAuthentication as userAuthorization } from '../middlewares/user/verifyAuthentication';

const routes = Router();

routes.get('/', userAuthorization, ListTeacherController.handle);
routes.get('/:id', userAuthorization, ShowTeacherController.handle);
routes.post('/', CreateTeacherController.handle);
routes.put('/:id', teacherAuthorization, UpdateTeacherController.handle);
routes.delete('/:id', teacherAuthorization, DeleteTeacherController.handle);

routes.post('/login', AuthenticationTeacherController.handle);

export default routes;
