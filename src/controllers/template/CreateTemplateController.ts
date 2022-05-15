import { Request, Response } from 'express';
import { ITemplateRequest } from '../../dto/template/ITemplateRequest';
import { TemplateRepository } from '../../repositories/implementations/TemplateRepository';
import { CreateTemplateService } from '../../services/template/CreateTemplateService';

class CreateTemplateController {
  async handle(req: Request, res: Response) {
    const createTemplateParams = req.body as ITemplateRequest;

    const createTemplateService = new CreateTemplateService(new TemplateRepository());

    const template = await createTemplateService.execute(createTemplateParams);

    return res.status(200).json(template);
  }
}

export default new CreateTemplateController();
