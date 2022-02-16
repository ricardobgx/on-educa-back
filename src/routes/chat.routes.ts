import { Router } from 'express';
import ListChatController from '../controllers/chat/ListChatController';
import ShowChatController from '../controllers/chat/ShowChatController';
import CreateChatController from '../controllers/chat/CreateChatController';
import DeleteChatController from '../controllers/chat/DeleteChatController';
import ListChatByPeopleController from '../controllers/chat/ListChatByPeopleController';
import GetOrCreateChatController from '../controllers/chat/GetOrCreateChatController';

const routes = Router();

routes.get('/', ListChatController.handle);
routes.get('/:peopleId', ListChatByPeopleController.handle);
routes.get('/:id', ShowChatController.handle);
routes.post('/', CreateChatController.handle);
routes.post('/getOrCreate', GetOrCreateChatController.handle);
routes.delete('/:id', DeleteChatController.handle);

export default routes;
