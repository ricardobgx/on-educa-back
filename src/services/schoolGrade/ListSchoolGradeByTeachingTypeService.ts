import { getCustomRepository, ObjectType } from "typeorm";
import { SchoolGrade } from "../../entities/SchoolGrade";
import { ISchoolGradeRepository } from "../../repositories/interfaces/ISchoolGradeRepository";

export class ListSchoolGradeByTeachingTypeService {
  schoolGradeRepository: ISchoolGradeRepository;

  constructor(schoolGradeRepository: ISchoolGradeRepository) {
    this.schoolGradeRepository = schoolGradeRepository;
  }

  async execute(teachingTypeId: string): Promise<SchoolGrade[]> {
    const schoolGradeRepository = getCustomRepository(this.schoolGradeRepository as unknown as ObjectType<ISchoolGradeRepository>);

    const schoolGrades = schoolGradeRepository.findByTeachingType(teachingTypeId);

    return schoolGrades;
  }
}