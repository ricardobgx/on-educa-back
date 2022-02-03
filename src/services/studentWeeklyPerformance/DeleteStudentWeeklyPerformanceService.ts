import { getCustomRepository, ObjectType } from 'typeorm';
import { ApplicationErrors } from '../../errors';
import { IStudentWeeklyPerformanceRepository } from '../../repositories/interfaces/IStudentWeeklyPerformanceRepository';

export class DeleteStudentWeeklyPerformanceService {
  studentWeeklyPerformanceRepository: IStudentWeeklyPerformanceRepository;

  constructor(
    studentWeeklyPerformanceRepository: IStudentWeeklyPerformanceRepository
  ) {
    this.studentWeeklyPerformanceRepository =
      studentWeeklyPerformanceRepository;
  }

  async execute(id: string): Promise<void> {
    const studentWeeklyPerformanceRepository = getCustomRepository(
      this
        .studentWeeklyPerformanceRepository as unknown as ObjectType<IStudentWeeklyPerformanceRepository>
    );

    const studentWeeklyPerformance =
      await studentWeeklyPerformanceRepository.findById(id);

    if (!studentWeeklyPerformance)
      throw new ApplicationErrors('Entidade não existe!', 404);

    await studentWeeklyPerformanceRepository.deleteById(id);
  }
}
