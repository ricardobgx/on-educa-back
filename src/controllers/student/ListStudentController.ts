import { Request, Response } from "express";
import { StudentRepository } from "../../repositories/implementations/StudentRepository";
import { ListStudentService } from "../../services/student/ListStudentService";

class ListStudentController {
  async handle(req: Request, res: Response) {
    const listStudentService = new ListStudentService(new StudentRepository());

    const students = await listStudentService.execute();

    return res.status(200).json(students);
  }
}

export default new ListStudentController();