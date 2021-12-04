import { Request, Response } from "express";
import { UnityRepository } from "../../repositories/implementations/UnityRepository";
import { ListUnityService } from "../../services/unity/ListUnityService";

class ListUnityController {
  async handle(req: Request, res: Response) {
    const listUnityService = new ListUnityService(new UnityRepository());

    const units = await listUnityService.execute();

    return res.status(200).json(units);
  }
}

export default new ListUnityController();