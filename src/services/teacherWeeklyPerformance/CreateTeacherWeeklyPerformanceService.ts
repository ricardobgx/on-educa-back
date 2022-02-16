import { hash } from 'bcryptjs';
import { getCustomRepository, ObjectType } from 'typeorm';
import { ITeacherWeeklyPerformanceRequest } from '../../dto/teacherWeeklyPerformance/ITeacherWeeklyPerformanceRequest';
import { TeacherWeeklyPerformance } from '../../entities/TeacherWeeklyPerformance';
import { ITeacherWeeklyPerformanceRepository } from '../../repositories/interfaces/ITeacherWeeklyPerformanceRepository';

export class CreateTeacherWeeklyPerformanceService {
  teacherWeeklyPerformanceRepository: ITeacherWeeklyPerformanceRepository;

  constructor(
    teacherWeeklyPerformanceRepository: ITeacherWeeklyPerformanceRepository
  ) {
    this.teacherWeeklyPerformanceRepository =
      teacherWeeklyPerformanceRepository;
  }

  async execute(
    teacherWeeklyPerformanceParams: ITeacherWeeklyPerformanceRequest
  ): Promise<TeacherWeeklyPerformance> {
    const teacherWeeklyPerformanceRepository = getCustomRepository(
      this
        .teacherWeeklyPerformanceRepository as unknown as ObjectType<ITeacherWeeklyPerformanceRepository>
    );

    const teacherWeeklyPerformance =
      await teacherWeeklyPerformanceRepository.createTeacherWeeklyPerformance(
        teacherWeeklyPerformanceParams
      );

    return teacherWeeklyPerformance;
  }
}
