import { Router } from "express";
import CreateUnityController from "../controllers/unity/CreateUnityController";
import ListUnityBySubjectController from "../controllers/unity/ListUnityBySubjectController";
import ListUnityController from "../controllers/unity/ListUnityController";

const routes = Router();

routes.get('/', ListUnityController.handle);
routes.get('/subject/:id', ListUnityBySubjectController.handle);
routes.post('/', CreateUnityController.handle);

export default routes;