import { getCustomRepository, ObjectType } from 'typeorm';
import { TeacherWeeklyPerformance } from '../../entities/TeacherWeeklyPerformance';
import { ITeacherWeeklyPerformanceRepository } from '../../repositories/interfaces/ITeacherWeeklyPerformanceRepository';

export class ListTeacherWeeklyPerformanceByTeacherService {
  teacherWeeklyPerformanceRepository: ITeacherWeeklyPerformanceRepository;

  constructor(
    teacherWeeklyPerformanceRepository: ITeacherWeeklyPerformanceRepository
  ) {
    this.teacherWeeklyPerformanceRepository =
      teacherWeeklyPerformanceRepository;
  }

  async execute(teacherId): Promise<TeacherWeeklyPerformance> {
    const teacherWeeklyPerformanceRepository = getCustomRepository(
      this
        .teacherWeeklyPerformanceRepository as unknown as ObjectType<ITeacherWeeklyPerformanceRepository>
    );

    const teacher = teacherWeeklyPerformanceRepository.findByTeacher(teacherId);

    return teacher;
  }
}
