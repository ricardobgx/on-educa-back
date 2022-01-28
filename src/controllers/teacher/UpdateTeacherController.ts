import { Request, Response } from 'express';
import { ITeacherRequest } from '../../dto/ITeacherRequest';
import { TeacherRepository } from '../../repositories/implementations/TeacherRepository';
import { UpdateTeacherService } from '../../services/teacher/UpdateTeacherService';

class UpdateTeacherController {
  async handle(req: Request, res: Response) {
    const {
      name,
      email,
      password,
      isOnline,
      profilePictureId,
      teachingTypeId,
    } = req.body as ITeacherRequest;

    const { id } = req.params;

    const updateTeacherService = new UpdateTeacherService(
      new TeacherRepository()
    );

    await updateTeacherService.execute({
      id,
      email,
      name,
      password,
      isOnline,
      profilePictureId,
      teachingTypeId,
    });

    return res.status(200).json({ message: 'Professor atualizado!' });
  }
}

export default new UpdateTeacherController();
