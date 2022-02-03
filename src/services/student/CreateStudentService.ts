import { getCustomRepository, ObjectType } from 'typeorm';
import { IStudentRequest } from '../../dto/IStudentRequest';
import { Student } from '../../entities/Student';
import { IStudentRepository } from '../../repositories/interfaces/IStudentRepository';

export class CreateStudentService {
  StudentRepository: IStudentRepository;

  constructor(StudentRepository: IStudentRepository) {
    this.StudentRepository = StudentRepository;
  }

  async execute(studentParams: IStudentRequest): Promise<Student> {
    const studentRepository = getCustomRepository(
      this.StudentRepository as unknown as ObjectType<IStudentRepository>
    );

    const student = await studentRepository.createStudent({ ...studentParams });

    return student;
  }
}
