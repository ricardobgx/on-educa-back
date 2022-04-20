import { getCustomRepository, ObjectType } from 'typeorm';
import { ITeacherWeeklyPerformanceRequest } from '../../dto/teacherWeeklyPerformance/ITeacherWeeklyPerformanceRequest';
import { ApplicationErrors } from '../../errors';
import { ITeacherWeeklyPerformanceRepository } from '../../repositories/interfaces/ITeacherWeeklyPerformanceRepository';

export class UpdateTeacherWeeklyPerformanceService {
  teacherWeeklyPerformanceRepository: ITeacherWeeklyPerformanceRepository;

  constructor(
    teacherWeeklyPerformanceRepository: ITeacherWeeklyPerformanceRepository
  ) {
    this.teacherWeeklyPerformanceRepository =
      teacherWeeklyPerformanceRepository;
  }

  async execute(
    teacherWeeklyPerformanceParams: ITeacherWeeklyPerformanceRequest
  ): Promise<void> {
    const teacherWeeklyPerformanceRepository = getCustomRepository(
      this
        .teacherWeeklyPerformanceRepository as unknown as ObjectType<ITeacherWeeklyPerformanceRepository>
    );

    const teacherWeeklyPerformance =
      await teacherWeeklyPerformanceRepository.findById(
        teacherWeeklyPerformanceParams.id
      );

    if (!teacherWeeklyPerformance)
      throw new ApplicationErrors('Disciplina não existe', 404);

    await teacherWeeklyPerformanceRepository.updateById(
      teacherWeeklyPerformanceParams
    );
  }
}
