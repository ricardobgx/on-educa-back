import { Request, Response } from "express";
import { TeacherRepository } from "../../repositories/implementations/TeacherRepository";
import { ListTeacherService } from "../../services/teacher/ListTeacherService";

class ListTeacherController {
  async handle(req: Request, res: Response) {
    const listTeacherService = new ListTeacherService(new TeacherRepository());

    const teachers = await listTeacherService.execute();

    return res.status(200).json(teachers);
  }
}

export default new ListTeacherController();