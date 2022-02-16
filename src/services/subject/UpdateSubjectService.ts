import { getCustomRepository, ObjectType } from 'typeorm';
import { ISubjectRequest } from '../../dto/subject/ISubjectRequest';
import { ApplicationErrors } from '../../errors';
import { ISubjectRepository } from '../../repositories/interfaces/ISubjectRepository';

export class UpdateSubjectService {
  SubjectRepository: ISubjectRepository;

  constructor(SubjectRepository: ISubjectRepository) {
    this.SubjectRepository = SubjectRepository;
  }

  async execute(subjectParams: ISubjectRequest): Promise<void> {
    const subjectRepository = getCustomRepository(
      this.SubjectRepository as unknown as ObjectType<ISubjectRepository>
    );

    const subject = await subjectRepository.findById(subjectParams.id);

    if (!subject) throw new ApplicationErrors('Disciplina não existe', 404);

    await subjectRepository.updateById(subjectParams);
  }
}
