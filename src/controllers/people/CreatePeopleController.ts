import { Request, Response } from 'express';

import { IPeopleRequest } from '../../dto/IPeopleRequest';
import { PeopleRepository } from '../../repositories/implementations/PeopleRepository';
import { CreatePeopleService } from '../../services/people/CreatePeopleService';

class CreatePeopleController {
  async handle(req: Request, res: Response) {
    const { email, name, password, isOnline, isStudent } =
      req.body as IPeopleRequest;

    const profilePictureId = process.env.DEFAULT_PROFILE_PICTURE;

    const createPeopleService = new CreatePeopleService(new PeopleRepository());

    const people = await createPeopleService.execute({
      email,
      name,
      password,
      isOnline,
      isStudent,
      profilePictureId,
    });

    return res.status(201).json(people);
  }
}

export default new CreatePeopleController();
