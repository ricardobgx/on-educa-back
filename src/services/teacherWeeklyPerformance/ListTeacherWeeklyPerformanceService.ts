import { getCustomRepository, ObjectType } from 'typeorm';
import { TeacherWeeklyPerformance } from '../../entities/TeacherWeeklyPerformance';
import { ITeacherWeeklyPerformanceRepository } from '../../repositories/interfaces/ITeacherWeeklyPerformanceRepository';

export class ListTeacherWeeklyPerformanceService {
  teacherWeeklyPerformanceRepository: ITeacherWeeklyPerformanceRepository;

  constructor(
    teacherWeeklyPerformanceRepository: ITeacherWeeklyPerformanceRepository
  ) {
    this.teacherWeeklyPerformanceRepository =
      teacherWeeklyPerformanceRepository;
  }

  async execute(): Promise<TeacherWeeklyPerformance[]> {
    const teacherWeeklyPerformanceRepository = getCustomRepository(
      this
        .teacherWeeklyPerformanceRepository as unknown as ObjectType<ITeacherWeeklyPerformanceRepository>
    );

    const teacherWeeklyPerformances =
      await teacherWeeklyPerformanceRepository.findAll();

    return teacherWeeklyPerformances;
  }
}
