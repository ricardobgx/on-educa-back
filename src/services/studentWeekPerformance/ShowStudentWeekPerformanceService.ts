import { getCustomRepository, ObjectType } from 'typeorm';
import { StudentWeekPerformance } from '../../entities/StudentWeekPerformance';
import { ApplicationErrors } from '../../errors';
import { IStudentWeekPerformanceRepository } from '../../repositories/interfaces/IStudentWeekPerformanceRepository';

export class ShowStudentWeekPerformanceService {
  studentWeekPerformanceRepository: IStudentWeekPerformanceRepository;

  constructor(
    studentWeekPerformanceRepository: IStudentWeekPerformanceRepository
  ) {
    this.studentWeekPerformanceRepository = studentWeekPerformanceRepository;
  }

  async execute(id: string): Promise<StudentWeekPerformance> {
    const studentWeekPerformanceRepository = getCustomRepository(
      this
        .studentWeekPerformanceRepository as unknown as ObjectType<IStudentWeekPerformanceRepository>
    );

    const studentWeekPerformance =
      await studentWeekPerformanceRepository.findById(id);

    if (!studentWeekPerformance)
      throw new ApplicationErrors('Entidade não existe', 404);

    return studentWeekPerformance;
  }
}
