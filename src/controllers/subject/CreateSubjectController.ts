import { Request, Response } from 'express';

import { ISubjectRequest } from '../../dto/subject/ISubjectRequest';
import { SubjectRepository } from '../../repositories/implementations/SubjectRepository';
import { CreateSubjectService } from '../../services/subject/CreateSubjectService';

class CreateSubjectController {
  async handle(req: Request, res: Response) {
    const { name, schoolGradeId } = req.body as ISubjectRequest;

    const createSubjectService = new CreateSubjectService(
      new SubjectRepository()
    );

    const subject = await createSubjectService.execute({
      name,
      schoolGradeId,
    });

    return res.status(201).json(subject);
  }
}

export default new CreateSubjectController();
