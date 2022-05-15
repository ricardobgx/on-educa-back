import { Router } from 'express';
import CreateAchievementProgressController from '../controllers/achievementProgress/CreateAchievementProgressController';
import DeleteAchievementProgressController from '../controllers/achievementProgress/DeleteAchievementProgressController';
import ListAchievementProgressController from '../controllers/achievementProgress/ListAchievementProgressController';
import ShowAchievementProgressByPeopleAndAchievementController from '../controllers/achievementProgress/ShowAchievementProgressByPeopleAndAchievementController';
import UpdateAchievementProgressController from '../controllers/achievementProgress/UpdateAchievementProgressController';

const routes = Router();

routes.get('/', ListAchievementProgressController.handle);
routes.get(
  '/people/:peopleId/achievement/:achievementId',
  ShowAchievementProgressByPeopleAndAchievementController.handle
);
routes.post('/', CreateAchievementProgressController.handle);
routes.put('/:id', UpdateAchievementProgressController.handle);
routes.delete('/:id', DeleteAchievementProgressController.handle);

export default routes;
