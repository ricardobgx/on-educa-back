import { Request, Response } from "express";
import { IStudentRequest } from "../../dto/IStudentRequest";
import { StudentRepository } from "../../repositories/implementations/StudentRepository";
import { UpdateStudentService } from "../../services/student/UpdateStudentService";

class UpdateStudentController {
  async handle(req: Request, res: Response) {
    const { name, password, schoolGradeId, isOnline, profilePicture } = req.body as IStudentRequest;

    const { email } = req.params;

    const updateStudentService = new UpdateStudentService(new StudentRepository());

    await updateStudentService.execute({
      email,
      name,
      password,
      schoolGradeId,
      isOnline,
      profilePicture
    });

    return res.status(200).json({ message: "Estudante atualizado!" });
  }

}

export default new UpdateStudentController();