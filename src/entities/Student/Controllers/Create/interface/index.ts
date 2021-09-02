import { Request, Response } from 'express';

export interface ICreateStudentController {
  handle(request: Request, response: Response): any;
}