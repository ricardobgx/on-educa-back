import { getCustomRepository, ObjectType } from 'typeorm';
import { IUpdateStudentWeekPerformanceRequest } from '../../dto/IUpdateStudentWeekPerformanceRequest';
import { ApplicationErrors } from '../../errors';
import { StudentRepository } from '../../repositories/implementations/StudentRepository';
import { IStudentRepository } from '../../repositories/interfaces/IStudentRepository';
import { IStudentWeekPerformanceRepository } from '../../repositories/interfaces/IStudentWeekPerformanceRepository';

export class UpdateStudentWeekPerformanceValuesService {
  studentWeekPerformanceRepository: IStudentWeekPerformanceRepository;

  constructor(
    studentWeekPerformanceRepository: IStudentWeekPerformanceRepository
  ) {
    this.studentWeekPerformanceRepository = studentWeekPerformanceRepository;
  }

  async execute(
    studentWeekPerformanceParams: IUpdateStudentWeekPerformanceRequest
  ): Promise<void> {
    const studentWeekPerformanceRepository = getCustomRepository(
      this
        .studentWeekPerformanceRepository as unknown as ObjectType<IStudentWeekPerformanceRepository>
    );

    const studentRepository = getCustomRepository(
      StudentRepository as unknown as ObjectType<IStudentRepository>
    );
    const student = await studentRepository.findById(
      studentWeekPerformanceParams.studentId
    );

    if (!student) throw new ApplicationErrors('Estudante não existe', 404);

    await studentWeekPerformanceRepository.updateStudentWeekPerformanceValues(
      studentWeekPerformanceParams
    );
  }
}
