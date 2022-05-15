import { Router } from 'express';
import CreateAchievementLevelController from '../controllers/achievementLevel/CreateAchievementLevelController';
import DeleteAchievementLevelController from '../controllers/achievementLevel/DeleteAchievementLevelController';
import ListAchievementLevelController from '../controllers/achievementLevel/ListAchievementLevelController';
import UpdateAchievementLevelController from '../controllers/achievementLevel/UpdateAchievementLevelController';

const routes = Router();

routes.get('/', ListAchievementLevelController.handle);
routes.post('/', CreateAchievementLevelController.handle);
routes.put('/:id', UpdateAchievementLevelController.handle);
routes.delete('/:id', DeleteAchievementLevelController.handle);

export default routes;
