import { getCustomRepository, ObjectType } from "typeorm";
import { ApplicationErrors } from "../../errors";
import { ISubjectRepository } from "../../repositories/interfaces/ISubjectRepository";

export class DeleteSubjectService {
  SubjectRepository: ISubjectRepository;

  constructor(SubjectRepository: ISubjectRepository) {
    this.SubjectRepository = SubjectRepository;
  }

  async execute(id: string): Promise<void> {
    const subjectRepository = getCustomRepository(this.SubjectRepository as unknown as ObjectType<ISubjectRepository>);

    const subject = await subjectRepository.findById(id);

    if (!subject) throw new ApplicationErrors("Disciplina não existe!", 404);

    await subjectRepository.deleteById(id);
  }
}