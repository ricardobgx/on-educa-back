import { Request, Response } from "express";
import { ITeacherRequest } from "../../dto/ITeacherRequest";
import { TeacherRepository } from "../../repositories/implementations/TeacherRepository";
import { UpdateTeacherService } from "../../services/teacher/UpdateTeacherService";

class UpdateTeacherController {
  async handle(req: Request, res: Response) {
    const { name, password, isOnline, profilePicture, subjects } = req.body as ITeacherRequest;

    const { email } = req.params;

    const updateTeacherService = new UpdateTeacherService(new TeacherRepository());

    await updateTeacherService.execute({ email, name, password, isOnline, profilePicture, subjects });

    return res.status(200).json({ message: "Professor atualizado!" });
  }

}

export default new UpdateTeacherController();