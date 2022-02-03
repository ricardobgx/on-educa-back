import { Request, Response } from 'express';
import { PeopleRepository } from '../../repositories/implementations/PeopleRepository';
import { ShowPeopleService } from '../../services/people/ShowPeopleService';

class ShowPeopleController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showPeopleService = new ShowPeopleService(new PeopleRepository());

    const people = await showPeopleService.execute(id);

    return res.status(200).json(people);
  }
}

export default new ShowPeopleController();
