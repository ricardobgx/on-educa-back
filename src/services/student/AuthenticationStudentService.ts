import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository, ObjectType } from "typeorm";
import { ApplicationErrors } from "../../errors";
import { IStudentRepository } from "../../repositories/interfaces/IStudentRepository";
import { IUserAuthenticationRequest } from "../../dto/IUserAuthenticationRequest";

export class AuthenticationStudentService {
  StudentRepository: IStudentRepository;

  constructor(StudentRepository: IStudentRepository) {
    this.StudentRepository = StudentRepository;
  }

  async execute(credentials: IUserAuthenticationRequest): Promise<string> {
    const { email, password } = credentials;

    const studentRepository = getCustomRepository(this.StudentRepository as unknown as ObjectType<IStudentRepository>);

    const student = await studentRepository.findByEmail(email);

    if (!student) throw new ApplicationErrors("E-mail ou senha incorreta", 400);

    const passwordCompared = await compare(password, student.password);

    if (!passwordCompared) throw new ApplicationErrors("E-mail ou senha incorreta", 400);

    const tokenKey = process.env.TOKEN_KEY || '';
    const token = sign(
      {
        email
      },
      tokenKey,
      {
        expiresIn: "7d",
        subject: student.email
      }
    );

    return token;
  }
}