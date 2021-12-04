import { Request, Response } from "express";
import { SubjectRepository } from "../../repositories/implementations/SubjectRepository";
import { ListSubjectBySchoolGradeService } from "../../services/subject/ListSubjectBySchoolGradeService";

class ListSubjectBySchoolGradeController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const listSubjectBySchoolGradeService = new ListSubjectBySchoolGradeService(new SubjectRepository());

    const subjects = await listSubjectBySchoolGradeService.execute(id);

    return res.status(200).json(subjects);
  }
}

export default new ListSubjectBySchoolGradeController();