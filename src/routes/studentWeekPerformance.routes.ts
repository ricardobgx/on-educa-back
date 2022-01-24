import { Router } from 'express';
import CreateStudentWeekPerformanceController from '../controllers/studentWeekPerformance/CreateStudentWeekPerformanceController';
import DeleteStudentWeekPerformanceController from '../controllers/studentWeekPerformance/DeleteStudentWeekPerformanceController';
import ListStudentWeekPerformanceByStudentController from '../controllers/studentWeekPerformance/ListStudentWeekPerformanceByStudentController';
import ListStudentWeekPerformanceController from '../controllers/studentWeekPerformance/ListStudentWeekPerformanceController';
import UpdateStudentWeekPerformanceController from '../controllers/studentWeekPerformance/UpdateStudentWeekPerformanceController';
import UpdateStudentWeekPerformanceValuesController from '../controllers/studentWeekPerformance/UpdateStudentWeekPerformanceValuesController';

const routes = Router();

routes.get('/', ListStudentWeekPerformanceController.handle);
routes.get(
  '/student/:id',
  ListStudentWeekPerformanceByStudentController.handle
);
routes.post('/', CreateStudentWeekPerformanceController.handle);
routes.put('/:id', UpdateStudentWeekPerformanceController.handle);
routes.put('/student/:id', UpdateStudentWeekPerformanceValuesController.handle);
routes.delete('/:id', DeleteStudentWeekPerformanceController.handle);

export default routes;
