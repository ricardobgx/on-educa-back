import { Request, Response } from 'express';

export interface ICreateTeacherController {
  handle(request: Request, response: Response): any;
}