import { Router } from 'express';
import CreateMissionProgressController from '../controllers/missionProgress/CreateMissionProgressController';
import DeleteMissionProgressController from '../controllers/missionProgress/DeleteMissionProgressController';
import ListMissionProgressController from '../controllers/missionProgress/ListMissionProgressController';
import UpdateMissionProgressController from '../controllers/missionProgress/UpdateMissionProgressController';

const routes = Router();

routes.get('/', ListMissionProgressController.handle);
routes.post('/', CreateMissionProgressController.handle);
routes.put('/:id', UpdateMissionProgressController.handle);
routes.delete('/:id', DeleteMissionProgressController.handle);

export default routes;
