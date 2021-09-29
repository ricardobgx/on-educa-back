import { Request, Response } from "express";
import { TeacherRepository } from "../../repositories/implementations/TeacherRepository";
import { ShowTeacherService } from "../../services/teacher/ShowTeacherService";

class ShowTeacherController {
  async handle(req: Request, res: Response) {
    const { email } = req.params;

    const showTeacherService = new ShowTeacherService(new TeacherRepository());

    const teacher = await showTeacherService.execute(email);

    return res.status(200).json(teacher);
  }
}

export default new ShowTeacherController();