import { getCustomRepository, ObjectType } from 'typeorm';
import { IUpdateTeacherWeeklyPerformanceRequest } from '../../dto/teacherWeeklyPerformance/IUpdateTeacherWeeklyPerformanceRequest';
import { ApplicationErrors } from '../../errors';
import { TeacherRepository } from '../../repositories/implementations/TeacherRepository';
import { ITeacherRepository } from '../../repositories/interfaces/ITeacherRepository';
import { ITeacherWeeklyPerformanceRepository } from '../../repositories/interfaces/ITeacherWeeklyPerformanceRepository';

export class UpdateTeacherWeeklyPerformanceValuesService {
  teacherWeeklyPerformanceRepository: ITeacherWeeklyPerformanceRepository;

  constructor(
    teacherWeeklyPerformanceRepository: ITeacherWeeklyPerformanceRepository
  ) {
    this.teacherWeeklyPerformanceRepository =
      teacherWeeklyPerformanceRepository;
  }

  async execute(
    teacherWeeklyPerformanceParams: IUpdateTeacherWeeklyPerformanceRequest
  ): Promise<void> {
    const teacherWeeklyPerformanceRepository = getCustomRepository(
      this
        .teacherWeeklyPerformanceRepository as unknown as ObjectType<ITeacherWeeklyPerformanceRepository>
    );

    const teacherRepository = getCustomRepository(
      TeacherRepository as unknown as ObjectType<ITeacherRepository>
    );
    const teacher = await teacherRepository.findById(
      teacherWeeklyPerformanceParams.teacherId
    );

    if (!teacher) throw new ApplicationErrors('Professor não existe', 404);

    await teacherWeeklyPerformanceRepository.updateTeacherWeeklyPerformanceValues(
      teacherWeeklyPerformanceParams
    );
  }
}
