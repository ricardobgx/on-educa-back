import { Request, Response } from "express";

import { IEntityNameRequest } from "../../dto/IEntityNameRequest";
import { EntityNameRepository } from "../../repositories/implementations/EntityNameRepository";
import { CreateEntityNameService } from "../../services/EntityName/CreateEntityNameService";

class CreateEntityNameController {
  async handle(req: Request, res: Response) {
    const { name, schoolGradeId } = req.body as IEntityNameRequest;

    const createEntityNameService = new CreateEntityNameService(new EntityNameRepository());

    const entityName = await createEntityNameService.execute({
      name,
      schoolGradeId
    });

    return res.status(201).json(entityName);
  }
}

export default new CreateEntityNameController();