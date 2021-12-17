import { Request, Response } from "express";
import { EntityNameRepository } from "../../repositories/implementations/EntityNameRepository";
import { DeleteEntityNameService } from "../../services/EntityName/DeleteEntityNameService";

class DeleteEntityNameController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteEntityNameService = new DeleteEntityNameService(new EntityNameRepository());

    await deleteEntityNameService.execute(id);

    return res.status(200).json({ message: "Disciplina removida!" });
  }
}

export default new DeleteEntityNameController();