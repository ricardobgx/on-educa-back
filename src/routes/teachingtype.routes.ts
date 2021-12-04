import { Router } from 'express';
import CreateTeachingTypeController from '../controllers/teachingType/CreateTeachingTypeController';
import ListTeachingTypeController from '../controllers/teachingType/ListTeachingTypeController';

const routes = Router();

routes.get('/', ListTeachingTypeController.handle);
routes.post('/', CreateTeachingTypeController.handle);

export default routes;