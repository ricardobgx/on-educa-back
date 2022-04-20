import { Router } from 'express';
import AcceptFriendRequestController from '../controllers/friendRequest/AcceptFriendRequestController';
import CreateFriendRequestController from '../controllers/friendRequest/CreateFriendRequestController';
import DeleteFriendRequestController from '../controllers/friendRequest/DeleteFriendRequestController';
import ListFriendRequestByPeopleController from '../controllers/friendRequest/ListFriendRequestByPeopleController';
import ListFriendRequestController from '../controllers/friendRequest/ListFriendRequestController';
import ShowFriendRequestController from '../controllers/friendRequest/ShowFriendRequestController';

const routes = Router();

routes.get('/', ListFriendRequestController.handle);
routes.get('/:id', ShowFriendRequestController.handle);
routes.get('/people/:peopleId', ListFriendRequestByPeopleController.handle);
routes.put('/accept/:id', AcceptFriendRequestController.handle);
routes.post('/', CreateFriendRequestController.handle);
routes.delete('/:id', DeleteFriendRequestController.handle);

export default routes;
