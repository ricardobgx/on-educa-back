import { getCustomRepository, ObjectType } from 'typeorm';
import { IStudentRequest } from '../../dto/IStudentRequest';
import { ApplicationErrors } from '../../errors';
import { IStudentRepository } from '../../repositories/interfaces/IStudentRepository';

export class UpdateStudentService {
  StudentRepository: IStudentRepository;

  constructor(StudentRepository: IStudentRepository) {
    this.StudentRepository = StudentRepository;
  }

  async execute(studentParams: IStudentRequest): Promise<void> {
    const studentRepository = getCustomRepository(
      this.StudentRepository as unknown as ObjectType<IStudentRepository>
    );

    const student = await studentRepository.findById(studentParams.id);

    if (!student) throw new ApplicationErrors('Estudante não existe', 404);

    await studentRepository.updateById(studentParams);
  }
}
