import { Router } from "express";
import CreateSubjectController from "../controllers/subject/CreateSubjectController";
import DeleteSubjectController from "../controllers/subject/DeleteSubjectController";
import ListSubjectController from "../controllers/subject/ListSubjectController";
import ShowSubjectController from "../controllers/subject/ShowSubjectController";
import UpdateSubjectController from "../controllers/subject/UpdateSubjectController";

const routes = Router();

routes.get("/", ListSubjectController.handle);
routes.get('/:id', ShowSubjectController.handle);
routes.post("/", CreateSubjectController.handle);
routes.put("/:id", UpdateSubjectController.handle);
routes.delete("/:id", DeleteSubjectController.handle);

export default routes;