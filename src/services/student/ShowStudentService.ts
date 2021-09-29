import { getCustomRepository, ObjectType } from "typeorm";
import { Student } from "../../entities/Student";
import { ApplicationErrors } from "../../errors";
import { IStudentRepository } from "../../repositories/interfaces/IStudentRepository";

export class ShowStudentService {
  StudentRepository: IStudentRepository;

  constructor(StudentRepository: IStudentRepository) {
    this.StudentRepository = StudentRepository;
  }

  async execute(email: string): Promise<Student> {
    const studentRepository = getCustomRepository(this.StudentRepository as unknown as ObjectType<IStudentRepository>);

    const student = await studentRepository.findByEmail(email);

    if (!student) throw new ApplicationErrors("Estudante não existe", 404);

    return student;
  }
}