import { Router } from 'express';
import CreateStudentController from '../controllers/student/CreateStudentController';
import DeleteStudentController from '../controllers/student/DeleteStudentController';
import ListStudentController from '../controllers/student/ListStudentController';
import ShowStudentController from '../controllers/student/ShowStudentController';
import UpdateStudentController from '../controllers/student/UpdateStudentController';
import { verifyAuthentication as studentAuthorization } from '../middlewares/student/verifyAuthentication';
import { verifyAuthentication as peopleAuthorization } from '../middlewares/people/verifyAuthentication';

const routes = Router();

routes.get('/', peopleAuthorization, ListStudentController.handle);
routes.get('/:id', peopleAuthorization, ShowStudentController.handle);
routes.post('/', CreateStudentController.handle);
routes.put('/:id', studentAuthorization, UpdateStudentController.handle);
routes.delete('/:email', studentAuthorization, DeleteStudentController.handle);

export default routes;
