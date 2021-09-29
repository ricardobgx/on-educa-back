import { getCustomRepository, ObjectType } from "typeorm";
import { Student } from "../../entities/Student";
import { IStudentRepository } from "../../repositories/interfaces/IStudentRepository";

export class ListStudentService {
  StudentRepository: IStudentRepository;

  constructor(StudentRepository: IStudentRepository) {
    this.StudentRepository = StudentRepository;
  }

  async execute(): Promise<Student[]> {
    const studentRepository = getCustomRepository(this.StudentRepository as unknown as ObjectType<IStudentRepository>);

    const students = await studentRepository.findAll();

    return students;
  }
}