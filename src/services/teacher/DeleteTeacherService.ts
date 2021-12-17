import { getCustomRepository, ObjectType } from 'typeorm';
import { ApplicationErrors } from '../../errors';
import { ITeacherRepository } from '../../repositories/interfaces/ITeacherRepository';

export class DeleteTeacherService {
  TeacherRepository: ITeacherRepository;

  constructor(TeacherRepository: ITeacherRepository) {
    this.TeacherRepository = TeacherRepository;
  }

  async execute(id: string): Promise<void> {
    const teacherRepository = getCustomRepository(
      this.TeacherRepository as unknown as ObjectType<ITeacherRepository>
    );

    const teacher = await teacherRepository.findById(id);

    if (!teacher) throw new ApplicationErrors('Professor não existe!', 404);

    await teacherRepository.deleteById(id);
  }
}
