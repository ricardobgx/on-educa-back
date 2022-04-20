import { Router } from 'express';
import ListMessageController from '../controllers/message/ListMessageController';
import ShowMessageController from '../controllers/message/ShowMessageController';
import CreateMessageController from '../controllers/message/CreateMessageController';
import DeleteMessageController from '../controllers/message/DeleteMessageController';

const routes = Router();

routes.get('/', ListMessageController.handle);
routes.get('/:id', ShowMessageController.handle);
routes.post('/', CreateMessageController.handle);
routes.delete('/:id', DeleteMessageController.handle);

export default routes;
