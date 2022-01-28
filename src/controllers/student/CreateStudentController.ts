import { Request, Response } from 'express';

import { IStudentRequest } from '../../dto/IStudentRequest';
import { ApplicationErrors } from '../../errors';
import { StudentRepository } from '../../repositories/implementations/StudentRepository';
import { CreateStudentService } from '../../services/student/CreateStudentService';

class CreateStudentController {
  async handle(req: Request, res: Response) {
    const { email, name, password, schoolGradeId, isOnline, userType } =
      req.body as IStudentRequest;

    const profilePictureId = process.env.DEFAULT_PROFILE_PICTURE;

    const createStudentService = new CreateStudentService(
      new StudentRepository()
    );

    const student = await createStudentService.execute({
      email,
      name,
      password,
      schoolGradeId,
      isOnline,
      userType,
      profilePictureId,
    });

    return res.status(201).json(student);
  }
}

export default new CreateStudentController();
