import { Request, Response } from "express";

import { SubjectRepository } from "../../repositories/implementations/SubjectRepository";
import { CreateManySubjectsService } from "../../services/subject/CreateManySubjectsService";

class CreateManySubjectsController {
  async handle(req: Request, res: Response) {
    const { names, schoolGradeId } = req.body;

    const createManySubjectsService = new CreateManySubjectsService(new SubjectRepository());

    const subjects = await createManySubjectsService.execute({ names, schoolGradeId });

    return res.status(201).json(subjects);
  }
}

export default new CreateManySubjectsController();