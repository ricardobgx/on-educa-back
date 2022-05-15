import { Router } from 'express';
import CreateAchievementController from '../controllers/achievement/CreateAchievementController';
import DeleteAchievementController from '../controllers/achievement/DeleteAchievementController';
import ListAchievementController from '../controllers/achievement/ListAchievementController';
import UpdateAchievementController from '../controllers/achievement/UpdateAchievementController';

const routes = Router();

routes.get('/', ListAchievementController.handle);
routes.post('/', CreateAchievementController.handle);
routes.put('/:id', UpdateAchievementController.handle);
routes.delete('/:id', DeleteAchievementController.handle);

export default routes;
