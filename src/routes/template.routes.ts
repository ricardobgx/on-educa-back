import { Router } from 'express';
import CreateTemplateController from '../controllers/template/CreateTemplateController';
import DeleteTemplateController from '../controllers/template/DeleteTemplateController';
import ListTemplateController from '../controllers/template/ListTemplateController';
import UpdateTemplateController from '../controllers/template/UpdateTemplateController';

const routes = Router();

routes.get('/', ListTemplateController.handle);
routes.post('/', CreateTemplateController.handle);
routes.put('/:id', UpdateTemplateController.handle);
routes.delete('/:id', DeleteTemplateController.handle);

export default routes;
