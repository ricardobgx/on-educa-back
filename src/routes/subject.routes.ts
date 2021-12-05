import { Router } from "express";
import CreateManySubjectsController from "../controllers/subject/CreateManySubjectsController";
import CreateSubjectController from "../controllers/subject/CreateSubjectController";
import DeleteSubjectController from "../controllers/subject/DeleteSubjectController";
import ListSubjectBySchoolGradeController from "../controllers/subject/ListSubjectBySchoolGradeController";
import ListSubjectController from "../controllers/subject/ListSubjectController";
import ShowSubjectController from "../controllers/subject/ShowSubjectController";
import UpdateSubjectController from "../controllers/subject/UpdateSubjectController";

const routes = Router();

routes.get("/", ListSubjectController.handle);
routes.get("/schoolgrade/:id", ListSubjectBySchoolGradeController.handle);
routes.get('/:id', ShowSubjectController.handle);
routes.post("/", CreateSubjectController.handle);
routes.post("/many", CreateManySubjectsController.handle);
routes.put("/:id", UpdateSubjectController.handle);
routes.delete("/:id", DeleteSubjectController.handle);

export default routes;