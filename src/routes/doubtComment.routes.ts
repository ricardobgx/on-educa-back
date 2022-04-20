import { Router } from 'express';
import CreateDoubtCommentController from '../controllers/doubtComment/CreateDoubtCommentController';
import DeleteDoubtCommentController from '../controllers/doubtComment/DeleteDoubtCommentController';
import ListDoubtCommentController from '../controllers/doubtComment/ListDoubtCommentController';
import ListDoubtCommentsByDoubtController from '../controllers/doubtComment/ListDoubtCommentsByDoubtController';
import ShowDoubtCommentController from '../controllers/doubtComment/ShowDoubtCommentController';
import UpdateDoubtCommentController from '../controllers/doubtComment/UpdateDoubtCommentController';

const routes = Router();

routes.get('/', ListDoubtCommentController.handle);
routes.get('/doubt/:doubtId', ListDoubtCommentsByDoubtController.handle);
routes.get('/:id', ShowDoubtCommentController.handle);
routes.post('/', CreateDoubtCommentController.handle);
routes.put('/:id', UpdateDoubtCommentController.handle);
routes.delete('/:id', DeleteDoubtCommentController.handle);

export default routes;
