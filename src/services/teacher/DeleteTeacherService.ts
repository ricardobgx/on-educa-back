import { getCustomRepository, ObjectType } from "typeorm";
import { ApplicationErrors } from "../../errors";
import { ITeacherRepository } from "../../repositories/interfaces/ITeacherRepository";

export class DeleteTeacherService {
  TeacherRepository: ITeacherRepository;

  constructor(TeacherRepository: ITeacherRepository) {
    this.TeacherRepository = TeacherRepository;
  }

  async execute(email: string): Promise<void> {
    const teacherRepository = getCustomRepository(this.TeacherRepository as unknown as ObjectType<ITeacherRepository>);

    const teacher = await teacherRepository.findByEmail(email);

    if (!teacher) throw new ApplicationErrors("Professor não existe!", 404);

    await teacherRepository.deleteByEmail(email);
  }
}