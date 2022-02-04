import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository, ObjectType } from 'typeorm';
import { ApplicationErrors } from '../../errors';
import { IPeopleRepository } from '../../repositories/interfaces/IPeopleRepository';
import { IPeopleAuthenticationRequest } from '../../dto/IPeopleAuthenticationRequest';
import { IAuthenticationResponse } from '../../dto/IAuthenticationResponse';

export class AuthenticationPeopleService {
  peopleRepository: IPeopleRepository;

  constructor(peopleRepository: IPeopleRepository) {
    this.peopleRepository = peopleRepository;
  }

  async execute(
    credentials: IPeopleAuthenticationRequest
  ): Promise<IAuthenticationResponse> {
    const { email, password } = credentials;

    const peopleRepository = getCustomRepository(
      this.peopleRepository as unknown as ObjectType<IPeopleRepository>
    );

    const people = await peopleRepository.findByEmail(email);

    console.log(credentials);

    if (!people) throw new ApplicationErrors('E-mail ou senha incorreta', 400);

    const passwordCompared = await compare(password, people.password);

    if (!passwordCompared)
      throw new ApplicationErrors('E-mail ou senha incorreta', 400);

    const tokenKey = process.env.TOKEN_KEY || '';
    const token = sign(
      {
        id: people.id,
      },
      tokenKey,
      {
        expiresIn: '7d',
        subject: people.id,
      }
    );

    return { id: people.id, token };
  }
}
