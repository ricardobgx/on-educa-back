import { getCustomRepository, ObjectType } from 'typeorm';
import { ISchoolGradeRequest } from '../../dto/schoolGrade/ISchoolGradeRequest';
import { SchoolGrade } from '../../entities/SchoolGrade';
import { ISchoolGradeRepository } from '../../repositories/interfaces/ISchoolGradeRepository';

export class CreateSchoolGradeService {
  schoolGradeRepository: ISchoolGradeRepository;

  constructor(schoolGradeRepository: ISchoolGradeRepository) {
    this.schoolGradeRepository = schoolGradeRepository;
  }

  async execute(schoolGradeParams: ISchoolGradeRequest): Promise<SchoolGrade> {
    const schoolGradeRepository = getCustomRepository(
      this
        .schoolGradeRepository as unknown as ObjectType<ISchoolGradeRepository>
    );

    const schoolGrade =
      schoolGradeRepository.createSchoolGrade(schoolGradeParams);

    return schoolGrade;
  }
}
