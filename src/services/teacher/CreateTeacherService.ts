import { hash } from 'bcryptjs';
import { getCustomRepository, ObjectType } from 'typeorm';
import { ITeacherRequest } from '../../dto/ITeacherRequest';
import { Teacher } from '../../entities/Teacher';
import { ApplicationErrors } from '../../errors';
import { ITeacherRepository } from '../../repositories/interfaces/ITeacherRepository';

export class CreateTeacherService {
  teacherRepository: ITeacherRepository;

  constructor(teacherRepository: ITeacherRepository) {
    this.teacherRepository = teacherRepository;
  }

  async execute(teacherParams: ITeacherRequest): Promise<Teacher> {
    const teacherRepository = getCustomRepository(
      this.teacherRepository as unknown as ObjectType<ITeacherRepository>
    );

    const teacher = await teacherRepository.createTeacher({ ...teacherParams });

    return teacher;
  }
}
