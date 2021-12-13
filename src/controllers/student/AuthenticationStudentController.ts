import { Request, Response } from "express";
import { IUserAuthenticationRequest } from "../../dto/IUserAuthenticationRequest";
import { StudentRepository } from "../../repositories/implementations/StudentRepository";
import { AuthenticationStudentService } from "../../services/student/AuthenticationStudentService";

class AuthenticationStudentController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body as IUserAuthenticationRequest;

    const authenticationStudentService = new AuthenticationStudentService(new StudentRepository());

    const authResponse = await authenticationStudentService.execute({ email, password });

    return res.status(201).json(authResponse);
  }
}

export default new AuthenticationStudentController();