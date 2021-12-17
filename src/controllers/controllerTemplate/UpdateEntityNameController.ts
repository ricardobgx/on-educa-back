import { Request, Response } from "express";
import { IEntityNameRequest } from "../../dto/IEntityNameRequest";
import { EntityNameRepository } from "../../repositories/implementations/EntityNameRepository";
import { UpdateEntityNameService } from "../../services/EntityName/UpdateEntityNameService";

class UpdateEntityNameController {
  async handle(req: Request, res: Response) {
    const { name } = req.body as IEntityNameRequest;

    const { id } = req.params;

    const updateEntityNameService = new UpdateEntityNameService(new EntityNameRepository());

    await updateEntityNameService.execute({ id, name });

    return res.status(200).json({ message: "Disciplina atualizada!" });
  }

}

export default new UpdateEntityNameController();