import { Router } from 'express';
import CreateManyTeachingTypesController from '../controllers/teachingType/CreateManyTeachingTypesController';
import CreateTeachingTypeController from '../controllers/teachingType/CreateTeachingTypeController';
import ListTeachingTypeController from '../controllers/teachingType/ListTeachingTypeController';

const routes = Router();

routes.get('/', ListTeachingTypeController.handle);
routes.post('/', CreateTeachingTypeController.handle);
routes.post('/many', CreateManyTeachingTypesController.handle);

export default routes;
