import { getCustomRepository, ObjectType } from "typeorm";
import { ApplicationErrors } from "../../errors";
import { IStudentRepository } from "../../repositories/interfaces/IStudentRepository";

export class DeleteStudentService {
  StudentRepository: IStudentRepository;

  constructor(StudentRepository: IStudentRepository) {
    this.StudentRepository = StudentRepository;
  }

  async execute(email: string): Promise<void> {
    const studentRepository = getCustomRepository(this.StudentRepository as unknown as ObjectType<IStudentRepository>);

    const student = await studentRepository.findByEmail(email);

    if (!student) throw new ApplicationErrors("Estudante não existe!", 404);

    await studentRepository.deleteByEmail(email);
  }
}