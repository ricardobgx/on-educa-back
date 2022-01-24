import { hash } from 'bcryptjs';
import { getCustomRepository, ObjectType } from 'typeorm';
import { IStudentWeekPerformanceRequest } from '../../dto/IStudentWeekPerformanceRequest';
import { StudentWeekPerformance } from '../../entities/StudentWeekPerformance';
import { IStudentWeekPerformanceRepository } from '../../repositories/interfaces/IStudentWeekPerformanceRepository';

export class CreateStudentWeekPerformanceService {
  studentWeekPerformanceRepository: IStudentWeekPerformanceRepository;

  constructor(
    studentWeekPerformanceRepository: IStudentWeekPerformanceRepository
  ) {
    this.studentWeekPerformanceRepository = studentWeekPerformanceRepository;
  }

  async execute(
    studentWeekPerformanceParams: IStudentWeekPerformanceRequest
  ): Promise<StudentWeekPerformance> {
    const studentWeekPerformanceRepository = getCustomRepository(
      this
        .studentWeekPerformanceRepository as unknown as ObjectType<IStudentWeekPerformanceRepository>
    );

    const studentWeekPerformance =
      await studentWeekPerformanceRepository.createStudentWeekPerformance(
        studentWeekPerformanceParams
      );

    return studentWeekPerformance;
  }
}
