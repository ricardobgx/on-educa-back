import { Request, Response } from 'express';
import TeacherRepository from '../../../Repository/implementation';
import CreateTeacherService from '../../../Services/Create/implementation';
import { ITeacherRequest } from '../../../Services/Create/types';
import { ICreateTeacherController } from "../interface";

class CreateTeacherController implements ICreateTeacherController {  
  async handle(request: Request, response: Response) {
    const { name, email, password, photo, subjects, isOnline } = request.body as ITeacherRequest;

    const createteacherService = new CreateTeacherService(new TeacherRepository());

    const teacher = await createteacherService.execute({
      name,
      email,
      password,
      photo,
      subjects,
      isOnline
    });

    return response.status(201).json(teacher);
  }
}

export default new CreateTeacherController();