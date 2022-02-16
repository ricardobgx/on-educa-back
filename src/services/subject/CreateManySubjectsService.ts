import { getCustomRepository, ObjectType } from 'typeorm';
import { IManySubjects } from '../../dto/subject/IManySubjects';
import { Subject } from '../../entities/Subject';
import { ISubjectRepository } from '../../repositories/interfaces/ISubjectRepository';

export class CreateManySubjectsService {
  SubjectRepository: ISubjectRepository;

  constructor(SubjectRepository: ISubjectRepository) {
    this.SubjectRepository = SubjectRepository;
  }

  async execute(subjectsParams: IManySubjects): Promise<Subject[]> {
    const subjectRepository = getCustomRepository(
      this.SubjectRepository as unknown as ObjectType<ISubjectRepository>
    );

    const subjects = await subjectRepository.createManySubjects(subjectsParams);

    return subjects;
  }
}
