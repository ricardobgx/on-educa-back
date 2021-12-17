import { Request, Response } from "express";
import { EntityNameRepository } from "../../repositories/implementations/EntityNameRepository";
import { ListEntityNameService } from "../../services/EntityName/ListEntityNameService";

class ListEntityNameController {
  async handle(req: Request, res: Response) {
    const listEntityNameService = new ListEntityNameService(new EntityNameRepository());

    const entityNames = await listEntityNameService.execute();

    return res.status(200).json(entityNames);
  }
}

export default new ListEntityNameController();