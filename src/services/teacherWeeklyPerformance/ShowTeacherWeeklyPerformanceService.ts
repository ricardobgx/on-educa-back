import { getCustomRepository, ObjectType } from 'typeorm';
import { TeacherWeeklyPerformance } from '../../entities/TeacherWeeklyPerformance';
import { ApplicationErrors } from '../../errors';
import { ITeacherWeeklyPerformanceRepository } from '../../repositories/interfaces/ITeacherWeeklyPerformanceRepository';

export class ShowTeacherWeeklyPerformanceService {
  teacherWeeklyPerformanceRepository: ITeacherWeeklyPerformanceRepository;

  constructor(
    teacherWeeklyPerformanceRepository: ITeacherWeeklyPerformanceRepository
  ) {
    this.teacherWeeklyPerformanceRepository =
      teacherWeeklyPerformanceRepository;
  }

  async execute(id: string): Promise<TeacherWeeklyPerformance> {
    const teacherWeeklyPerformanceRepository = getCustomRepository(
      this
        .teacherWeeklyPerformanceRepository as unknown as ObjectType<ITeacherWeeklyPerformanceRepository>
    );

    const teacherWeeklyPerformance =
      await teacherWeeklyPerformanceRepository.findById(id);

    if (!teacherWeeklyPerformance)
      throw new ApplicationErrors('Entidade não existe', 404);

    return teacherWeeklyPerformance;
  }
}
