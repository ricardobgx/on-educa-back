import { getCustomRepository, ObjectType } from 'typeorm';
import { StudentWeekPerformance } from '../../entities/StudentWeekPerformance';
import { IStudentWeekPerformanceRepository } from '../../repositories/interfaces/IStudentWeekPerformanceRepository';

export class ListStudentWeekPerformanceByStudentService {
  studentWeekPerformanceRepository: IStudentWeekPerformanceRepository;

  constructor(
    studentWeekPerformanceRepository: IStudentWeekPerformanceRepository
  ) {
    this.studentWeekPerformanceRepository = studentWeekPerformanceRepository;
  }

  async execute(studentId): Promise<StudentWeekPerformance> {
    const studentWeekPerformanceRepository = getCustomRepository(
      this
        .studentWeekPerformanceRepository as unknown as ObjectType<IStudentWeekPerformanceRepository>
    );

    const student = studentWeekPerformanceRepository.findByStudent(studentId);

    return student;
  }
}
