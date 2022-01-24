import { getCustomRepository, ObjectType } from 'typeorm';
import { StudentWeekPerformance } from '../../entities/StudentWeekPerformance';
import { IStudentWeekPerformanceRepository } from '../../repositories/interfaces/IStudentWeekPerformanceRepository';

export class ListStudentWeekPerformanceService {
  studentWeekPerformanceRepository: IStudentWeekPerformanceRepository;

  constructor(
    studentWeekPerformanceRepository: IStudentWeekPerformanceRepository
  ) {
    this.studentWeekPerformanceRepository = studentWeekPerformanceRepository;
  }

  async execute(): Promise<StudentWeekPerformance[]> {
    const studentWeekPerformanceRepository = getCustomRepository(
      this
        .studentWeekPerformanceRepository as unknown as ObjectType<IStudentWeekPerformanceRepository>
    );

    const studentWeekPerformances =
      await studentWeekPerformanceRepository.findAll();

    return studentWeekPerformances;
  }
}
