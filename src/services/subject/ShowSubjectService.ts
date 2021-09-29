import { getCustomRepository, ObjectType } from "typeorm";
import { Subject } from "../../entities/Subject";
import { ApplicationErrors } from "../../errors";
import { ISubjectRepository } from "../../repositories/interfaces/ISubjectRepository";

export class ShowSubjectService {
  SubjectRepository: ISubjectRepository;

  constructor(SubjectRepository: ISubjectRepository) {
    this.SubjectRepository = SubjectRepository;
  }

  async execute(id: string): Promise<Subject> {
    const subjectRepository = getCustomRepository(this.SubjectRepository as unknown as ObjectType<ISubjectRepository>);

    const subject = await subjectRepository.findById(id);

    if (!subject) throw new ApplicationErrors("Disciplina não existe", 404);

    return subject;
  }
}