import { getCustomRepository, ObjectType } from 'typeorm';
import { IUpdateStudentWeeklyPerformanceRequest } from '../../dto/IUpdateStudentWeeklyPerformanceRequest';
import { ApplicationErrors } from '../../errors';
import { StudentRepository } from '../../repositories/implementations/StudentRepository';
import { IStudentRepository } from '../../repositories/interfaces/IStudentRepository';
import { IStudentWeeklyPerformanceRepository } from '../../repositories/interfaces/IStudentWeeklyPerformanceRepository';

export class UpdateStudentWeeklyPerformanceValuesService {
  studentWeeklyPerformanceRepository: IStudentWeeklyPerformanceRepository;

  constructor(
    studentWeeklyPerformanceRepository: IStudentWeeklyPerformanceRepository
  ) {
    this.studentWeeklyPerformanceRepository =
      studentWeeklyPerformanceRepository;
  }

  async execute(
    studentWeeklyPerformanceParams: IUpdateStudentWeeklyPerformanceRequest
  ): Promise<void> {
    const studentWeeklyPerformanceRepository = getCustomRepository(
      this
        .studentWeeklyPerformanceRepository as unknown as ObjectType<IStudentWeeklyPerformanceRepository>
    );

    const studentRepository = getCustomRepository(
      StudentRepository as unknown as ObjectType<IStudentRepository>
    );
    const student = await studentRepository.findById(
      studentWeeklyPerformanceParams.studentId
    );

    if (!student) throw new ApplicationErrors('Estudante não existe', 404);

    await studentWeeklyPerformanceRepository.updateStudentWeeklyPerformanceValues(
      studentWeeklyPerformanceParams
    );
  }
}
