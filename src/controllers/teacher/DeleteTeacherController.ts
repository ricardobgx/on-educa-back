import { Request, Response } from "express";
import { TeacherRepository } from "../../repositories/implementations/TeacherRepository";
import { DeleteTeacherService } from "../../services/teacher/DeleteTeacherService";

class DeleteTeacherController {
  async handle(req: Request, res: Response) {
    const { email } = req.params;

    const deleteTeacherService = new DeleteTeacherService(new TeacherRepository());

    await deleteTeacherService.execute(email);

    return res.status(200).json({ message: "Professor removido!" });
  }
}

export default new DeleteTeacherController();