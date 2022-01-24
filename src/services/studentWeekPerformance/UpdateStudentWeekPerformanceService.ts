import { getCustomRepository, ObjectType } from 'typeorm';
import { IStudentWeekPerformanceRequest } from '../../dto/IStudentWeekPerformanceRequest';
import { ApplicationErrors } from '../../errors';
import { IStudentWeekPerformanceRepository } from '../../repositories/interfaces/IStudentWeekPerformanceRepository';

export class UpdateStudentWeekPerformanceService {
  studentWeekPerformanceRepository: IStudentWeekPerformanceRepository;

  constructor(
    studentWeekPerformanceRepository: IStudentWeekPerformanceRepository
  ) {
    this.studentWeekPerformanceRepository = studentWeekPerformanceRepository;
  }

  async execute(
    studentWeekPerformanceParams: IStudentWeekPerformanceRequest
  ): Promise<void> {
    const studentWeekPerformanceRepository = getCustomRepository(
      this
        .studentWeekPerformanceRepository as unknown as ObjectType<IStudentWeekPerformanceRepository>
    );

    const studentWeekPerformance =
      await studentWeekPerformanceRepository.findById(
        studentWeekPerformanceParams.id
      );

    if (!studentWeekPerformance)
      throw new ApplicationErrors('Disciplina não existe', 404);

    await studentWeekPerformanceRepository.updateById(
      studentWeekPerformanceParams
    );
  }
}
