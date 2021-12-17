import { hash } from 'bcryptjs';
import { getCustomRepository, ObjectType } from 'typeorm';
import { ITeacherRequest } from '../../dto/ITeacherRequest';
import { ApplicationErrors } from '../../errors';
import { ITeacherRepository } from '../../repositories/interfaces/ITeacherRepository';

export class UpdateTeacherService {
  teacherRepository: ITeacherRepository;

  constructor(teacherRepository: ITeacherRepository) {
    this.teacherRepository = teacherRepository;
  }

  async execute(teacherParams: ITeacherRequest): Promise<void> {
    const teacherRepository = getCustomRepository(
      this.teacherRepository as unknown as ObjectType<ITeacherRepository>
    );

    const teacher = await teacherRepository.findById(teacherParams.id);

    if (!teacher) throw new ApplicationErrors('Professor não existe', 404);

    if (teacherParams.password) {
      teacherParams.password = await hash(teacherParams.password, 8);
    }

    await teacherRepository.updateById(teacherParams);
  }
}
