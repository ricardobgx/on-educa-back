import { getCustomRepository, ObjectType } from 'typeorm';
import { StudentWeeklyPerformance } from '../../entities/StudentWeeklyPerformance';
import { IStudentWeeklyPerformanceRepository } from '../../repositories/interfaces/IStudentWeeklyPerformanceRepository';

export class ListStudentWeeklyPerformanceByStudentService {
  studentWeeklyPerformanceRepository: IStudentWeeklyPerformanceRepository;

  constructor(
    studentWeeklyPerformanceRepository: IStudentWeeklyPerformanceRepository
  ) {
    this.studentWeeklyPerformanceRepository =
      studentWeeklyPerformanceRepository;
  }

  async execute(studentId): Promise<StudentWeeklyPerformance> {
    const studentWeeklyPerformanceRepository = getCustomRepository(
      this
        .studentWeeklyPerformanceRepository as unknown as ObjectType<IStudentWeeklyPerformanceRepository>
    );

    const student = studentWeeklyPerformanceRepository.findByStudent(studentId);

    return student;
  }
}
