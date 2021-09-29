import { NextFunction, Request, response, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  iat: number;
  exp: number;
  sub: string;
  email: string;
}

export function verifyAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
): void | Response<any, Record<string, any>> {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token não encontrado" });
  }

  const tokenKey = process.env.TOKEN_KEY || '';
  const tokenCripto = token.split(" ");

  try {
    const { sub, email } = verify(tokenCripto[1], tokenKey) as Payload;
    req.student_email = sub;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}