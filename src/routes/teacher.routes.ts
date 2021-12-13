import { Router } from "express";
import AuthenticationTeacherController from "../controllers/teacher/AuthenticationTeacherController";
import CreateTeacherController from "../controllers/teacher/CreateTeacherController";
import DeleteTeacherController from "../controllers/teacher/DeleteTeacherController";
import ListTeacherController from "../controllers/teacher/ListTeacherController";
import ShowTeacherController from "../controllers/teacher/ShowTeacherController";
import UpdateTeacherController from "../controllers/teacher/UpdateTeacherController";
import { verifyAuthentication as teacherAuthentication } from "../middlewares/teacher/verifyAuthentication";

const routes = Router();

routes.get("/", teacherAuthentication, ListTeacherController.handle);
routes.get('/:id', teacherAuthentication, ShowTeacherController.handle);
routes.post("/", CreateTeacherController.handle);
routes.put("/:email", teacherAuthentication, UpdateTeacherController.handle);
routes.delete("/:email", teacherAuthentication, DeleteTeacherController.handle);

routes.post("/login", AuthenticationTeacherController.handle);

export default routes;