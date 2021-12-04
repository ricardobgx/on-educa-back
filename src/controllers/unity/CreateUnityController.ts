import { Request, Response } from "express";
import { IUnityRequest } from "../../dto/IUnityRequest";
import { UnityRepository } from "../../repositories/implementations/UnityRepository";
import { CreateUnityService } from "../../services/unity/CreateUnityService";

class CreateUnityController {
  async handle(req: Request, res: Response) {
    const { title, subjectId } = req.body as IUnityRequest;

    const createUnityService = new CreateUnityService(new UnityRepository());

    const unity = await createUnityService.execute({ title, subjectId });

    return res.status(200).json(unity);
  }
}

export default new CreateUnityController();