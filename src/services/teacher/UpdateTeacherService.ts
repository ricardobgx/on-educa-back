import { hash } from "bcryptjs";
import { getCustomRepository, ObjectType } from "typeorm";
import { ITeacherRequest } from "../../dto/ITeacherRequest";
import { ApplicationErrors } from "../../errors";
import { ITeacherRepository } from "../../repositories/interfaces/ITeacherRepository";

export class UpdateTeacherService {
  TeacherRepository: ITeacherRepository;

  constructor(TeacherRepository: ITeacherRepository) {
    this.TeacherRepository = TeacherRepository;
  }

  async execute(teacherParams: ITeacherRequest): Promise<void> {
    const teacherRepository = getCustomRepository(this.TeacherRepository as unknown as ObjectType<ITeacherRepository>);

    const teacher = await teacherRepository.findByEmail(teacherParams.email);

    if (!teacher) throw new ApplicationErrors("Estudante não existe", 404);

    if (teacherParams.password) {
      teacherParams.password = await hash(teacherParams.password, 8);
    }

    await teacherRepository.updateByEmail(teacherParams);
  }
}