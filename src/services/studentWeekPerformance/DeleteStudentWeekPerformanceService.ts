import { getCustomRepository, ObjectType } from 'typeorm';
import { ApplicationErrors } from '../../errors';
import { IStudentWeekPerformanceRepository } from '../../repositories/interfaces/IStudentWeekPerformanceRepository';

export class DeleteStudentWeekPerformanceService {
  studentWeekPerformanceRepository: IStudentWeekPerformanceRepository;

  constructor(
    studentWeekPerformanceRepository: IStudentWeekPerformanceRepository
  ) {
    this.studentWeekPerformanceRepository = studentWeekPerformanceRepository;
  }

  async execute(id: string): Promise<void> {
    const studentWeekPerformanceRepository = getCustomRepository(
      this
        .studentWeekPerformanceRepository as unknown as ObjectType<IStudentWeekPerformanceRepository>
    );

    const studentWeekPerformance =
      await studentWeekPerformanceRepository.findById(id);

    if (!studentWeekPerformance)
      throw new ApplicationErrors('Entidade não existe!', 404);

    await studentWeekPerformanceRepository.deleteById(id);
  }
}
