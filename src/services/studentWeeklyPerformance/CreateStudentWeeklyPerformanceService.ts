import { hash } from 'bcryptjs';
import { getCustomRepository, ObjectType } from 'typeorm';
import { IStudentWeeklyPerformanceRequest } from '../../dto/IStudentWeeklyPerformanceRequest';
import { StudentWeeklyPerformance } from '../../entities/StudentWeeklyPerformance';
import { IStudentWeeklyPerformanceRepository } from '../../repositories/interfaces/IStudentWeeklyPerformanceRepository';

export class CreateStudentWeeklyPerformanceService {
  studentWeeklyPerformanceRepository: IStudentWeeklyPerformanceRepository;

  constructor(
    studentWeeklyPerformanceRepository: IStudentWeeklyPerformanceRepository
  ) {
    this.studentWeeklyPerformanceRepository =
      studentWeeklyPerformanceRepository;
  }

  async execute(
    studentWeeklyPerformanceParams: IStudentWeeklyPerformanceRequest
  ): Promise<StudentWeeklyPerformance> {
    const studentWeeklyPerformanceRepository = getCustomRepository(
      this
        .studentWeeklyPerformanceRepository as unknown as ObjectType<IStudentWeeklyPerformanceRepository>
    );

    const studentWeeklyPerformance =
      await studentWeeklyPerformanceRepository.createStudentWeeklyPerformance(
        studentWeeklyPerformanceParams
      );

    return studentWeeklyPerformance;
  }
}
