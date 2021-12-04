import { Request, Response } from "express";
import { UnityRepository } from "../../repositories/implementations/UnityRepository";
import { ListUnityBySubjectService } from "../../services/unity/ListUnityBySubjectService";

class ListUnityBySubjectController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const listUnityBySubjectService = new ListUnityBySubjectService(new UnityRepository());

    const units = await listUnityBySubjectService.execute(id);

    return res.status(200).json(units);
  }
}

export default new ListUnityBySubjectController();