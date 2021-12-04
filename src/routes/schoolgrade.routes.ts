import { Router } from "express";
import CreateSchoolGradeController from "../controllers/schoolGrade/CreateSchoolGradeController";
import ListSchoolGradeByTeachingTypeController from "../controllers/schoolGrade/ListSchoolGradeByTeachingTypeController";
import ListSchoolGradeController from "../controllers/schoolGrade/ListSchoolGradeController";

const routes = Router();

routes.get('/', ListSchoolGradeController.handle);
routes.get('/teachingtype/:id', ListSchoolGradeByTeachingTypeController.handle);
routes.post('/', CreateSchoolGradeController.handle);

export default routes;