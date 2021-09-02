import { getCustomRepository, ObjectType } from "typeorm";
import { ApplicationErrors } from "../../../../../errors";

import Teacher from "../../../Entity";
import { ITeacherRequest } from "../types";
import ITeacherRepository from "../../../Repository/interface";
import ICreateTeacherService from "../interface";

export default class CreateteacherService implements ICreateTeacherService {
  teacherRepository: ITeacherRepository;
  
  constructor(teacherRepository: ITeacherRepository) {
    this.teacherRepository = teacherRepository;
  }

  async execute(teacherParams: ITeacherRequest): Promise<Teacher | null> {
    // Pega o repositorio
    const teacherRepository = getCustomRepository(this.teacherRepository as unknown as ObjectType<ITeacherRepository>);

    // Verifica se o email esta sendo usado por algum estudante
    const teacherEmailExists = await teacherRepository.findByEmail(teacherParams.email);
    if (teacherEmailExists)
      throw new ApplicationErrors("Email already exists!", 401);

    // Cria o estudante no banco
    const teacher = await teacherRepository.createTeacher(teacherParams);

    // Retorna o estudante criado
    return teacher;
  }
}