import { Request, Response } from "express";
import { TemplateRepository } from "../../repositories/implementations/TemplateRepository";
import { ListTemplateService } from "../../services/template/ListTemplateService";

class ListTemplateController {
  async handle(req: Request, res: Response) {
    const listTemplateService = new ListTemplateService(new TemplateRepository());

    const templates = await listTemplateService.execute();

    return res.status(200).json(templates);
  }
}

export default new ListTemplateController();