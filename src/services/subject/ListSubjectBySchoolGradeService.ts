import { getCustomRepository, ObjectType } from "typeorm";
import { Subject } from "../../entities/Subject";
import { ISubjectRepository } from "../../repositories/interfaces/ISubjectRepository";

export class ListSubjectBySchoolGradeService {
  SubjectRepository: ISubjectRepository;

  constructor(SubjectRepository: ISubjectRepository) {
    this.SubjectRepository = SubjectRepository;
  }

  async execute(schoolGradeId: string): Promise<Subject[]> {
    const subjectRepository = getCustomRepository(this.SubjectRepository as unknown as ObjectType<ISubjectRepository>);

    const subjects = await subjectRepository.findBySchoolGrade(schoolGradeId);

    return subjects;
  }
}