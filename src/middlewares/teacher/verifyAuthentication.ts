import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { PeopleRepository } from '../../repositories/implementations/PeopleRepository';

interface Payload {
  iat: number;
  exp: number;
  sub: string;
  id: string;
}

export async function verifyAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const token = req.headers.authorization as string;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const tokenKey = process.env.TOKEN_KEY || '';
  const tokenCripto = token.split(' ');

  try {
    const { id } = verify(tokenCripto[1], tokenKey) as Payload;
    req.teacher_id = id;

    const userRepository = getCustomRepository(PeopleRepository);
    const teacher = await userRepository.findById(id);

    if (teacher && !teacher.isStudent) return next();
    return res.status(401).json({ message: 'Token inválido' });
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}
