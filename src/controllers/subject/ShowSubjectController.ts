import { Request, Response } from "express";
import { SubjectRepository } from "../../repositories/implementations/SubjectRepository";
import { ShowSubjectService } from "../../services/subject/ShowSubjectService";

class ShowSubjectController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showSubjectService = new ShowSubjectService(new SubjectRepository());

    const subject = await showSubjectService.execute(id);

    return res.status(200).json(subject);
  }
}

export default new ShowSubjectController();