import { hash } from "bcryptjs";
import { getCustomRepository, ObjectType } from "typeorm";
import { ITeacherRequest } from "../../dto/ITeacherRequest";
import { Teacher } from "../../entities/Teacher";
import { ApplicationErrors } from "../../errors";
import { ITeacherRepository } from "../../repositories/interfaces/ITeacherRepository";

export class CreateTeacherService {
  TeacherRepository: ITeacherRepository;

  constructor(TeacherRepository: ITeacherRepository) {
    this.TeacherRepository = TeacherRepository;
  }

  async execute(teacherParams: ITeacherRequest): Promise<Teacher> {
    const teacherRepository = getCustomRepository(this.TeacherRepository as unknown as ObjectType<ITeacherRepository>);

    const teacherExists = await teacherRepository.findByEmail(teacherParams.email);

    if (teacherExists) throw new ApplicationErrors("Professor já existe!", 400);

    const teacher = await teacherRepository.createTeacher({ ...teacherParams });

    return teacher;
  }
}