import { Router } from 'express';
import CreateTeacherWeeklyPerformanceController from '../controllers/teacherWeeklyPerformance/CreateTeacherWeeklyPerformanceController';
import DeleteTeacherWeeklyPerformanceController from '../controllers/teacherWeeklyPerformance/DeleteTeacherWeeklyPerformanceController';
import ListTeacherWeeklyPerformanceByStudentController from '../controllers/teacherWeeklyPerformance/ListTeacherWeeklyPerformanceByStudentController';
import ListTeacherWeeklyPerformanceController from '../controllers/teacherWeeklyPerformance/ListTeacherWeeklyPerformanceController';
import UpdateTeacherWeeklyPerformanceController from '../controllers/teacherWeeklyPerformance/UpdateTeacherWeeklyPerformanceController';
import UpdateTeacherWeeklyPerformanceValuesController from '../controllers/teacherWeeklyPerformance/UpdateTeacherWeeklyPerformanceValuesController';

const routes = Router();

routes.get('/', ListTeacherWeeklyPerformanceController.handle);
routes.get(
  '/teacher/:id',
  ListTeacherWeeklyPerformanceByStudentController.handle
);
routes.post('/', CreateTeacherWeeklyPerformanceController.handle);
routes.put('/:id', UpdateTeacherWeeklyPerformanceController.handle);
routes.put(
  '/teacher/:id',
  UpdateTeacherWeeklyPerformanceValuesController.handle
);
routes.delete('/:id', DeleteTeacherWeeklyPerformanceController.handle);

export default routes;
