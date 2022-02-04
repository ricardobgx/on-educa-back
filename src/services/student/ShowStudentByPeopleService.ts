import { getCustomRepository, ObjectType } from 'typeorm';
import { Student } from '../../entities/Student';
import { ApplicationErrors } from '../../errors';
import { IStudentRepository } from '../../repositories/interfaces/IStudentRepository';

export class ShowStudentByPeopleService {
  studentRepository: IStudentRepository;

  constructor(studentRepository: IStudentRepository) {
    this.studentRepository = studentRepository;
  }

  async execute(peopleId: string): Promise<Student> {
    const studentRepository = getCustomRepository(
      this.studentRepository as unknown as ObjectType<IStudentRepository>
    );

    const student = await studentRepository.findByPeopleId(peopleId);

    if (!student) throw new ApplicationErrors('Estudante não existe', 404);

    return student;
  }
}
