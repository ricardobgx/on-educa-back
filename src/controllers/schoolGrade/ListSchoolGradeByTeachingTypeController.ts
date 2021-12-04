import { Request, Response } from "express";
import { SchoolGradeRepository } from "../../repositories/implementations/SchoolGradeRepository";
import { ListSchoolGradeByTeachingTypeService } from "../../services/schoolGrade/ListSchoolGradeByTeachingTypeService";

class ListSchoolGradeByTeachingTypeController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const listSchoolGradeByTeachingTypeService = new ListSchoolGradeByTeachingTypeService(new SchoolGradeRepository());

    const schoolGrades = await listSchoolGradeByTeachingTypeService.execute(id);

    return res.status(200).json(schoolGrades);
  }
}

export default new ListSchoolGradeByTeachingTypeController();