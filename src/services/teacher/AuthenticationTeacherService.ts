import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository, ObjectType } from "typeorm";
import { ApplicationErrors } from "../../errors";
import { IUserAuthenticationRequest } from "../../dto/IUserAuthenticationRequest";
import { ITeacherRepository } from "../../repositories/interfaces/ITeacherRepository";
import { IAuthenticationResponse } from "../../dto/IAuthenticationResponse";

export class AuthenticationTeacherService {
  teacherRepository: ITeacherRepository;

  constructor(teacherRepository: ITeacherRepository) {
    this.teacherRepository = teacherRepository;
  }

  async execute(credentials: IUserAuthenticationRequest): Promise<IAuthenticationResponse> {
    const { email, password } = credentials;

    const teacherRepository = getCustomRepository(this.teacherRepository as unknown as ObjectType<ITeacherRepository>);

    const teacher = await teacherRepository.findByEmail(email);

    if (!teacher) throw new ApplicationErrors("E-mail ou senha incorreta", 400);

    const passwordCompared = await compare(password, teacher.password);

    if (!passwordCompared) throw new ApplicationErrors("E-mail ou senha incorreta", 400);

    const tokenKey = process.env.TOKEN_KEY || '';
    const token = sign(
      {
        email
      },
      tokenKey,
      {
        expiresIn: "7d",
        subject: teacher.email
      }
    );

    return { id: teacher.id, token };
  }
}