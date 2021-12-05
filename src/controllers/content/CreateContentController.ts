import { Request, Response } from "express";
import { IContentRequest } from "../../dto/IContentRequest";
import { ContentRepository } from "../../repositories/implementations/ContentRepository";
import { CreateContentService } from "../../services/content/CreateContentService";

class CreateContentController {
  async handle(req: Request, res: Response) {
    const { title, description, video, index, unityId } = req.body as IContentRequest;

    const createContentService = new CreateContentService(new ContentRepository());

    const content = await createContentService.execute({ title, description, video, index, unityId });

    return res.status(200).json(content);
  }
}

export default new CreateContentController();