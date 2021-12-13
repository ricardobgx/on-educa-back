import { Router } from "express";
import AuthenticationStudentController from "../controllers/student/AuthenticationStudentController";
import CreateStudentController from "../controllers/student/CreateStudentController";
import DeleteStudentController from "../controllers/student/DeleteStudentController";
import ListStudentController from "../controllers/student/ListStudentController";
import ShowStudentController from "../controllers/student/ShowStudentController";
import UpdateStudentController from "../controllers/student/UpdateStudentController";
import { verifyAuthentication as studentAuthentication } from "../middlewares/student/verifyAuthentication";

const routes = Router();

routes.get("/", studentAuthentication, ListStudentController.handle);
routes.get('/:id', studentAuthentication, ShowStudentController.handle);
routes.post("/", CreateStudentController.handle);
routes.put("/:email", studentAuthentication, UpdateStudentController.handle);
routes.delete("/:email", studentAuthentication, DeleteStudentController.handle);

routes.post("/login", AuthenticationStudentController.handle);

export default routes;