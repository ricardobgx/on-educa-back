import { Request, Response } from "express";
import { StudentRepository } from "../../repositories/implementations/StudentRepository";
import { ShowStudentService } from "../../services/student/ShowStudentService";

class ShowStudentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showStudentService = new ShowStudentService(new StudentRepository());

    const student = await showStudentService.execute(id);

    return res.status(200).json(student);
  }
}

export default new ShowStudentController();