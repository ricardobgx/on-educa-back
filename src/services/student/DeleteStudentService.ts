import { getCustomRepository, ObjectType } from 'typeorm';
import { ApplicationErrors } from '../../errors';
import { IStudentRepository } from '../../repositories/interfaces/IStudentRepository';

export class DeleteStudentService {
  StudentRepository: IStudentRepository;

  constructor(StudentRepository: IStudentRepository) {
    this.StudentRepository = StudentRepository;
  }

  async execute(id: string): Promise<void> {
    const studentRepository = getCustomRepository(
      this.StudentRepository as unknown as ObjectType<IStudentRepository>
    );

    const student = await studentRepository.findById(id);

    if (!student) throw new ApplicationErrors('Estudante não existe!', 404);

    await studentRepository.deleteById(id);
  }
}
