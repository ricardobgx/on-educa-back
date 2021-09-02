import { Request, Response } from 'express';
import StudentRepository from '../../../Repository/implementation';
import CreateStudentService from '../../../Services/Create/implementation';
import { IStudentRequest } from '../../../Services/Create/types';
import { ICreateStudentController } from "../interface";

class CreateStudentController implements ICreateStudentController {  
  async handle(request: Request, response: Response) {
    const { name, email, password, photo, schoolGrade, isOnline } = request.body as IStudentRequest;

    const createStudentService = new CreateStudentService(new StudentRepository());

    const student = await createStudentService.execute({
      name,
      email,
      password,
      photo,
      schoolGrade,
      isOnline
    });

    return response.status(201).json(student);
  }
}

export default new CreateStudentController();