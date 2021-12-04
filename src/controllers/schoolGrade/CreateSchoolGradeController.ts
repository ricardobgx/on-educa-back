import { Request, Response } from "express";
import { ISchoolGradeRequest } from "../../dto/ISchoolGradeRequest";
import { SchoolGradeRepository } from "../../repositories/implementations/SchoolGradeRepository";
import { CreateSchoolGradeService } from "../../services/schoolGrade/CreateSchoolGradeService";

class CreateSchoolGradeController {
  async handle(req: Request, res: Response) {
    const { index, teachingTypeId } = req.body as ISchoolGradeRequest;

    const createSchoolGradeService = new CreateSchoolGradeService(new SchoolGradeRepository());

    const schoolGrade = await createSchoolGradeService.execute({ index, teachingTypeId });

    return res.status(200).json(schoolGrade);
  }
}

export default new CreateSchoolGradeController();