import { getCustomRepository, ObjectType } from 'typeorm';
import { StudentWeeklyPerformance } from '../../entities/StudentWeeklyPerformance';
import { IStudentWeeklyPerformanceRepository } from '../../repositories/interfaces/IStudentWeeklyPerformanceRepository';

export class ListStudentWeeklyPerformanceService {
  studentWeeklyPerformanceRepository: IStudentWeeklyPerformanceRepository;

  constructor(
    studentWeeklyPerformanceRepository: IStudentWeeklyPerformanceRepository
  ) {
    this.studentWeeklyPerformanceRepository =
      studentWeeklyPerformanceRepository;
  }

  async execute(): Promise<StudentWeeklyPerformance[]> {
    const studentWeeklyPerformanceRepository = getCustomRepository(
      this
        .studentWeeklyPerformanceRepository as unknown as ObjectType<IStudentWeeklyPerformanceRepository>
    );

    const studentWeeklyPerformances =
      await studentWeeklyPerformanceRepository.findAll();

    return studentWeeklyPerformances;
  }
}
