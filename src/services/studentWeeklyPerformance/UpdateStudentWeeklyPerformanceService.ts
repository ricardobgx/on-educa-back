import { getCustomRepository, ObjectType } from 'typeorm';
import { IStudentWeeklyPerformanceRequest } from '../../dto/IStudentWeeklyPerformanceRequest';
import { ApplicationErrors } from '../../errors';
import { IStudentWeeklyPerformanceRepository } from '../../repositories/interfaces/IStudentWeeklyPerformanceRepository';

export class UpdateStudentWeeklyPerformanceService {
  studentWeeklyPerformanceRepository: IStudentWeeklyPerformanceRepository;

  constructor(
    studentWeeklyPerformanceRepository: IStudentWeeklyPerformanceRepository
  ) {
    this.studentWeeklyPerformanceRepository =
      studentWeeklyPerformanceRepository;
  }

  async execute(
    studentWeeklyPerformanceParams: IStudentWeeklyPerformanceRequest
  ): Promise<void> {
    const studentWeeklyPerformanceRepository = getCustomRepository(
      this
        .studentWeeklyPerformanceRepository as unknown as ObjectType<IStudentWeeklyPerformanceRepository>
    );

    const studentWeeklyPerformance =
      await studentWeeklyPerformanceRepository.findById(
        studentWeeklyPerformanceParams.id
      );

    if (!studentWeeklyPerformance)
      throw new ApplicationErrors('Disciplina não existe', 404);

    await studentWeeklyPerformanceRepository.updateById(
      studentWeeklyPerformanceParams
    );
  }
}
