import { getCustomRepository, ObjectType } from "typeorm";
import { Teacher } from "../../entities/Teacher";
import { ITeacherRepository } from "../../repositories/interfaces/ITeacherRepository";

export class ListTeacherService {
  TeacherRepository: ITeacherRepository;

  constructor(TeacherRepository: ITeacherRepository) {
    this.TeacherRepository = TeacherRepository;
  }

  async execute(): Promise<Teacher[]> {
    const teacherRepository = getCustomRepository(this.TeacherRepository as unknown as ObjectType<ITeacherRepository>);

    const teachers = await teacherRepository.findAll();

    return teachers;
  }
}