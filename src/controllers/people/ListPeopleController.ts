import { Request, Response } from 'express';
import { PeopleRepository } from '../../repositories/implementations/PeopleRepository';
import { ListPeopleService } from '../../services/people/ListPeopleService';

class ListPeopleController {
  async handle(req: Request, res: Response) {
    const listPeopleService = new ListPeopleService(new PeopleRepository());

    const peoples = await listPeopleService.execute();

    return res.status(200).json(peoples);
  }
}

export default new ListPeopleController();
