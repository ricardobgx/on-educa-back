import { Request, Response } from 'express';
import { IPeopleAuthenticationRequest } from '../../dto/IPeopleAuthenticationRequest';
import { PeopleRepository } from '../../repositories/implementations/PeopleRepository';
import { AuthenticationPeopleService } from '../../services/people/AuthenticationPeopleService';

class AuthenticationPeopleController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body as IPeopleAuthenticationRequest;

    const authenticationPeopleService = new AuthenticationPeopleService(
      new PeopleRepository()
    );

    const authResponse = await authenticationPeopleService.execute({
      email,
      password,
    });

    return res.status(201).json(authResponse);
  }
}

export default new AuthenticationPeopleController();
