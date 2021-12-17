import { Request, Response } from "express";
import { ContentRepository } from "../../repositories/implementations/ContentRepository";
import { ListContentService } from "../../services/content/ListContentService";

interface IListContentRequest {
  name?: string;
}

class ListContentController {
  async handle(req: Request, res: Response) {
    const { name } = req.query as IListContentRequest;
    
    const listContentService = new ListContentService(new ContentRepository());

    const contents = await listContentService.execute(name);

    return res.status(200).json(contents);
  }
}

export default new ListContentController();