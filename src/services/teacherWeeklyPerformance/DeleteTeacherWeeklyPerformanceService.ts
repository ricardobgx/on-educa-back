import { getCustomRepository, ObjectType } from 'typeorm';
import { ApplicationErrors } from '../../errors';
import { ITeacherWeeklyPerformanceRepository } from '../../repositories/interfaces/ITeacherWeeklyPerformanceRepository';

export class DeleteTeacherWeeklyPerformanceService {
  teacherWeeklyPerformanceRepository: ITeacherWeeklyPerformanceRepository;

  constructor(
    teacherWeeklyPerformanceRepository: ITeacherWeeklyPerformanceRepository
  ) {
    this.teacherWeeklyPerformanceRepository =
      teacherWeeklyPerformanceRepository;
  }

  async execute(id: string): Promise<void> {
    const teacherWeeklyPerformanceRepository = getCustomRepository(
      this
        .teacherWeeklyPerformanceRepository as unknown as ObjectType<ITeacherWeeklyPerformanceRepository>
    );

    const teacherWeeklyPerformance =
      await teacherWeeklyPerformanceRepository.findById(id);

    if (!teacherWeeklyPerformance)
      throw new ApplicationErrors('Entidade não existe!', 404);

    await teacherWeeklyPerformanceRepository.deleteById(id);
  }
}
