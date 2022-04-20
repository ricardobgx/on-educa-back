import { Router } from 'express';
import CreateStudentWeeklyPerformanceController from '../controllers/studentWeeklyPerformance/CreateStudentWeeklyPerformanceController';
import DeleteStudentWeeklyPerformanceController from '../controllers/studentWeeklyPerformance/DeleteStudentWeeklyPerformanceController';
import ListStudentWeeklyPerformanceByStudentController from '../controllers/studentWeeklyPerformance/ListStudentWeeklyPerformanceByStudentController';
import ListStudentWeeklyPerformanceController from '../controllers/studentWeeklyPerformance/ListStudentWeeklyPerformanceController';
import UpdateStudentWeeklyPerformanceController from '../controllers/studentWeeklyPerformance/UpdateStudentWeeklyPerformanceController';
import UpdateStudentWeeklyPerformanceValuesController from '../controllers/studentWeeklyPerformance/UpdateStudentWeeklyPerformanceValuesController';

const routes = Router();

routes.get('/', ListStudentWeeklyPerformanceController.handle);
routes.get(
  '/student/:id',
  ListStudentWeeklyPerformanceByStudentController.handle
);
routes.post('/', CreateStudentWeeklyPerformanceController.handle);
routes.put('/:id', UpdateStudentWeeklyPerformanceController.handle);
routes.put(
  '/student/:id',
  UpdateStudentWeeklyPerformanceValuesController.handle
);
routes.delete('/:id', DeleteStudentWeeklyPerformanceController.handle);

export default routes;
