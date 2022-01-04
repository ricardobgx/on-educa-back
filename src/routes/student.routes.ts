import { Router } from 'express';
import AuthenticationStudentController from '../controllers/student/AuthenticationStudentController';
import CreateStudentController from '../controllers/student/CreateStudentController';
import DeleteStudentController from '../controllers/student/DeleteStudentController';
import ListStudentController from '../controllers/student/ListStudentController';
import ShowStudentController from '../controllers/student/ShowStudentController';
import UpdateStudentController from '../controllers/student/UpdateStudentController';
import { verifyAuthentication as studentAuthorization } from '../middlewares/student/verifyAuthentication';
import { verifyAuthentication as userAuthorization } from '../middlewares/user/verifyAuthentication';

const routes = Router();

routes.get('/', userAuthorization, ListStudentController.handle);
routes.get('/:id', userAuthorization, ShowStudentController.handle);
routes.post('/', CreateStudentController.handle);
routes.put('/:id', studentAuthorization, UpdateStudentController.handle);
routes.delete('/:email', studentAuthorization, DeleteStudentController.handle);

routes.post('/login', AuthenticationStudentController.handle);

export default routes;
