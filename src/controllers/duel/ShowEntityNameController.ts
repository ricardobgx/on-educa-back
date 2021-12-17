import { Request, Response } from "express";
import { EntityNameRepository } from "../../repositories/implementations/EntityNameRepository";
import { ShowEntityNameService } from "../../services/EntityName/ShowEntityNameService";

class ShowEntityNameController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showEntityNameService = new ShowEntityNameService(new EntityNameRepository());

    const entityName = await showEntityNameService.execute(id);

    return res.status(200).json(entityName);
  }
}

export default new ShowEntityNameController();