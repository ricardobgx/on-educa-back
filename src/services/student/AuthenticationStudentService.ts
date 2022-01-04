import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository, ObjectType } from 'typeorm';
import { ApplicationErrors } from '../../errors';
import { IStudentRepository } from '../../repositories/interfaces/IStudentRepository';
import { IUserAuthenticationRequest } from '../../dto/IUserAuthenticationRequest';
import { IAuthenticationResponse } from '../../dto/IAuthenticationResponse';

export class AuthenticationStudentService {
  studentRepository: IStudentRepository;

  constructor(studentRepository: IStudentRepository) {
    this.studentRepository = studentRepository;
  }

  async execute(
    credentials: IUserAuthenticationRequest
  ): Promise<IAuthenticationResponse> {
    const { email, password } = credentials;

    const studentRepository = getCustomRepository(
      this.studentRepository as unknown as ObjectType<IStudentRepository>
    );

    const student = await studentRepository.findByEmail(email);

    if (!student) throw new ApplicationErrors('E-mail ou senha incorreta', 400);

    const passwordCompared = await compare(password, student.password);

    if (!passwordCompared)
      throw new ApplicationErrors('E-mail ou senha incorreta', 400);

    const tokenKey = process.env.TOKEN_KEY || '';
    const token = sign(
      {
        id: student.id,
      },
      tokenKey,
      {
        expiresIn: '7d',
        subject: student.id,
      }
    );

    return { id: student.id, token };
  }
}
