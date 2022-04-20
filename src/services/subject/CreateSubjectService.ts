import { getCustomRepository, ObjectType } from 'typeorm';
import { ISubjectRequest } from '../../dto/subject/ISubjectRequest';
import { Subject } from '../../entities/Subject';
import { ApplicationErrors } from '../../errors';
import { ISubjectRepository } from '../../repositories/interfaces/ISubjectRepository';

export class CreateSubjectService {
  SubjectRepository: ISubjectRepository;

  constructor(SubjectRepository: ISubjectRepository) {
    this.SubjectRepository = SubjectRepository;
  }

  async execute(subjectParams: ISubjectRequest): Promise<Subject> {
    const subjectRepository = getCustomRepository(
      this.SubjectRepository as unknown as ObjectType<ISubjectRepository>
    );

    const subjectExists = await subjectRepository.findById(subjectParams.id);

    if (subjectExists)
      throw new ApplicationErrors('Disciplina já existe!', 400);

    const subject = await subjectRepository.createSubject(subjectParams);

    return subject;
  }
}
