import { Request, Response } from "express";
import { SubjectRepository } from "../../repositories/implementations/SubjectRepository";
import { ListSubjectService } from "../../services/subject/ListSubjectService";

class ListSubjectController {
  async handle(req: Request, res: Response) {
    const listSubjectService = new ListSubjectService(new SubjectRepository());

    const subjects = await listSubjectService.execute();

    return res.status(200).json(subjects);
  }
}

export default new ListSubjectController();