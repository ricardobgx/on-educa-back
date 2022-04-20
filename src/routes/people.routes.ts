import { Router } from 'express';
import AddPeopleFriendController from '../controllers/people/AddPeopleFriendController';
import AuthenticationPeopleController from '../controllers/people/AuthenticationPeopleController';
import CreatePeopleController from '../controllers/people/CreatePeopleController';
import DeletePeopleController from '../controllers/people/DeletePeopleController';
import ListPeopleController from '../controllers/people/ListPeopleController';
import RemovePeopleFriendController from '../controllers/people/RemovePeopleFriendController';
import ShowPeopleController from '../controllers/people/ShowPeopleController';
import UpdatePeopleController from '../controllers/people/UpdatePeopleController';
import { verifyAuthentication as peopleAuthorization } from '../middlewares/people/verifyAuthentication';

const routes = Router();

routes.get('/', peopleAuthorization, ListPeopleController.handle);
routes.get('/:id', peopleAuthorization, ShowPeopleController.handle);
routes.post('/', CreatePeopleController.handle);
routes.put('/:id', peopleAuthorization, UpdatePeopleController.handle);
routes.delete('/:email', peopleAuthorization, DeletePeopleController.handle);
routes.put(
  '/:id/addFriend',
  peopleAuthorization,
  AddPeopleFriendController.handle
);
routes.put(
  '/:id/removeFriend',
  peopleAuthorization,
  RemovePeopleFriendController.handle
);

routes.post('/login', AuthenticationPeopleController.handle);

export default routes;
