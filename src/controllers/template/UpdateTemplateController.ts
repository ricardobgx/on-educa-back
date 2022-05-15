import { Request, Response } from 'express';
import { ITemplateRequest } from '../../dto/template/ITemplateRequest';
import { TemplateRepository } from '../../repositories/implementations/TemplateRepository';
import { UpdateTemplateService } from '../../services/template/UpdateTemplateService';

class UpdateTemplateController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const updateParams = req.body as ITemplateRequest;

    const updateTemplateService = new UpdateTemplateService(new TemplateRepository());

    await updateTemplateService.execute({ ...updateParams, id });

    return res.status(200).json({ message: 'Template atualizada' });
  }
}

export default new UpdateTemplateController();
