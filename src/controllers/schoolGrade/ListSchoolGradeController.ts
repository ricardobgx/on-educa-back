import { Request, Response } from "express";
import { SchoolGradeRepository } from "../../repositories/implementations/SchoolGradeRepository";
import { ListSchoolGradeService } from "../../services/schoolGrade/ListSchoolGradeService";

class ListSchoolGradeController {
  async handle(req: Request, res: Response) {
    const listSchoolGradeService = new ListSchoolGradeService(new SchoolGradeRepository());

    const schoolGrades = await listSchoolGradeService.execute();

    return res.status(200).json(schoolGrades);
  }
}

export default new ListSchoolGradeController();