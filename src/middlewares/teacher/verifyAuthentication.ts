import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { TeacherRepository } from '../../repositories/implementations/TeacherRepository';

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

    const teacherRepository = getCustomRepository(TeacherRepository);
    const teacher = await teacherRepository.findById(id);

    if (teacher) return next();
    return res.status(401).json({ message: 'Você não é um professor' });
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}
