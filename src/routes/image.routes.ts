import { Router } from 'express';
import { uploads } from '../config/upload';
import CreateImageController from '../controllers/image/CreateImageController';
import DeleteImageController from '../controllers/image/DeleteImageController';

const routes = Router();

routes.post('/', uploads.single('image'), CreateImageController.handle);
routes.delete('/:id', DeleteImageController.handle);

export default routes;
