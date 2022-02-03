import { Request, Response } from 'express';

import { IStudentRequest } from '../../dto/IStudentRequest';
import { StudentRepository } from '../../repositories/implementations/StudentRepository';
import { CreateStudentService } from '../../services/student/CreateStudentService';

class CreateStudentController {
  async handle(req: Request, res: Response) {
    const { peopleId, schoolGradeId } = req.body as IStudentRequest;

    const createStudentService = new CreateStudentService(
      new StudentRepository()
    );

    const student = await createStudentService.execute({
      peopleId,
      schoolGradeId,
    });

    return res.status(201).json(student);
  }
}

export default new CreateStudentController();
