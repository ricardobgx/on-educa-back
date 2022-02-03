import { Request, Response } from 'express';

import { ITeacherRequest } from '../../dto/ITeacherRequest';
import { TeacherRepository } from '../../repositories/implementations/TeacherRepository';
import { CreateTeacherService } from '../../services/teacher/CreateTeacherService';

class CreateTeacherController {
  async handle(req: Request, res: Response) {
    const { peopleId, teachingTypeId } = req.body as ITeacherRequest;

    const createTeacherService = new CreateTeacherService(
      new TeacherRepository()
    );

    const teacher = await createTeacherService.execute({
      peopleId,
      teachingTypeId,
    });

    return res.status(201).json(teacher);
  }
}

export default new CreateTeacherController();
