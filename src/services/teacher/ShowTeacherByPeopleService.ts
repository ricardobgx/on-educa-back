import { getCustomRepository, ObjectType } from 'typeorm';
import { Teacher } from '../../entities/Teacher';
import { ApplicationErrors } from '../../errors';
import { ITeacherRepository } from '../../repositories/interfaces/ITeacherRepository';

export class ShowTeacherByPeopleService {
  TeacherRepository: ITeacherRepository;

  constructor(TeacherRepository: ITeacherRepository) {
    this.TeacherRepository = TeacherRepository;
  }

  async execute(peopleId: string): Promise<Teacher> {
    const teacherRepository = getCustomRepository(
      this.TeacherRepository as unknown as ObjectType<ITeacherRepository>
    );

    const teacher = await teacherRepository.findByPeopleId(peopleId);

    if (!teacher) throw new ApplicationErrors('Professor não existe', 404);

    return teacher;
  }
}
