import { Request, Response } from "express";
import { ContentRepository } from "../../repositories/implementations/ContentRepository";
import { ListContentService } from "../../services/content/ListContentService";

class ListContentController {
  async handle(req: Request, res: Response) {
    const listContentService = new ListContentService(new ContentRepository());

    const contents = await listContentService.execute();

    return res.status(200).json(contents);
  }
}

export default new ListContentController();