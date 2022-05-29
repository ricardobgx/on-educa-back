import { Router } from 'express';
import CreateMissionController from '../controllers/mission/CreateMissionController';
import DeleteMissionController from '../controllers/mission/DeleteMissionController';
import ListMissionController from '../controllers/mission/ListMissionController';
import UpdateMissionController from '../controllers/mission/UpdateMissionController';

const routes = Router();

routes.get('/', ListMissionController.handle);
routes.post('/', CreateMissionController.handle);
routes.put('/:id', UpdateMissionController.handle);
routes.delete('/:id', DeleteMissionController.handle);

export default routes;
