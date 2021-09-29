import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository, ObjectType } from "typeorm";
import { ApplicationErrors } from "../../errors";
import { IUserAuthenticationRequest } from "../../dto/IUserAuthenticationRequest";
import { ITeacherRepository } from "../../repositories/interfaces/ITeacherRepository";

export class AuthenticationTeacherService {
  TeacherRepository: ITeacherRepository;

  constructor(TeacherRepository: ITeacherRepository) {
    this.TeacherRepository = TeacherRepository;
  }

  async execute(credentials: IUserAuthenticationRequest): Promise<string> {
    const { email, password } = credentials;

    const teacherRepository = getCustomRepository(this.TeacherRepository as unknown as ObjectType<ITeacherRepository>);

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

    return token;
  }
}