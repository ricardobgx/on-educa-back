import { Request, Response } from "express";
import { ContentRepository } from "../../repositories/implementations/ContentRepository";
import { ListContentByUnityService } from "../../services/content/ListContentByUnityService";

class ListContentByUnityController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const listContentByUnityService = new ListContentByUnityService(new ContentRepository());

    const contents = await listContentByUnityService.execute(id);

    return res.status(200).json(contents);
  }
}

export default new ListContentByUnityController();