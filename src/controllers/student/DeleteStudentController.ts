import { Request, Response } from "express";
import { StudentRepository } from "../../repositories/implementations/StudentRepository";
import { DeleteStudentService } from "../../services/student/DeleteStudentService";

class DeleteStudentController {
  async handle(req: Request, res: Response) {
    const { email } = req.params;

    const deleteStudentService = new DeleteStudentService(new StudentRepository());

    await deleteStudentService.execute(email);

    return res.status(200).json({ message: "Estudante removido!" });
  }
}

export default new DeleteStudentController();