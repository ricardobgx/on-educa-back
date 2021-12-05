import { Router } from "express";
import CreateContentController from "../controllers/content/CreateContentController";
import ListContentByUnityController from "../controllers/content/ListContentByUnityController";
import ListContentController from "../controllers/content/ListContentController";

const routes = Router();

routes.get('/', ListContentController.handle);
routes.get('/unity/:id', ListContentByUnityController.handle);
routes.post('/', CreateContentController.handle);

export default routes;