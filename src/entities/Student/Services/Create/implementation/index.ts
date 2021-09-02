import { getCustomRepository, ObjectType } from "typeorm";
import { ApplicationErrors } from "../../../../../errors";

import Student from "../../../Entity";
import { IStudentRequest } from "../types";
import IStudentRepository from "../../../Repository/interface";
import ICreateStudentService from "../interface";

export default class CreateStudentService implements ICreateStudentService {
  studentRepository: IStudentRepository;
  
  constructor(studentRepository: IStudentRepository) {
    this.studentRepository = studentRepository;
  }

  async execute(studentParams: IStudentRequest): Promise<Student | null> {
    // Pega o repositorio
    const studentRepository = getCustomRepository(this.studentRepository as unknown as ObjectType<IStudentRepository>);

    // Verifica se o email esta sendo usado por algum estudante
    const studentEmailExists = await studentRepository.findByEmail(studentParams.email);
    if (studentEmailExists)
      throw new ApplicationErrors('Email already exists!', 401);

    // Cria o estudante no banco
    const student = await studentRepository.createStudent(studentParams);

    // Retorna o estudante criado
    return student;
  }
}