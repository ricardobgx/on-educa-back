import { Request, Response } from "express";
import { IUserAuthenticationRequest } from "../../dto/IUserAuthenticationRequest";
import { TeacherRepository } from "../../repositories/implementations/TeacherRepository";
import { AuthenticationTeacherService } from "../../services/teacher/AuthenticationTeacherService";

class AuthenticationTeacherController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body as IUserAuthenticationRequest;

    const authenticationTeacherService = new AuthenticationTeacherService(new TeacherRepository());

    const token = await authenticationTeacherService.execute({ email, password });

    return res.status(201).json(token);
  }
}

export default new AuthenticationTeacherController();