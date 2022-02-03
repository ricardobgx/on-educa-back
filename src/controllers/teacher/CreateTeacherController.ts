import { Request, Response } from 'express';

import { ITeacherRequest } from '../../dto/ITeacherRequest';
import { TeacherRepository } from '../../repositories/implementations/TeacherRepository';
import { CreateTeacherService } from '../../services/teacher/CreateTeacherService';

class CreateTeacherController {
  async handle(req: Request, res: Response) {
    const { email, name, password, isOnline, teachingTypeId, userType } =
      req.body as ITeacherRequest;

    const profilePictureId = process.env.DEFAULT_PROFILE_PICTURE;

    const createTeacherService = new CreateTeacherService(
      new TeacherRepository()
    );

    const teacher = await createTeacherService.execute({
      email,
      name,
      password,
      isOnline,
      teachingTypeId,
      userType,
      profilePictureId,
    });

    return res.status(201).json(teacher);
  }
}

export default new CreateTeacherController();
