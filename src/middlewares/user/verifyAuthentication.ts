import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

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
    req.user_id = id;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}
