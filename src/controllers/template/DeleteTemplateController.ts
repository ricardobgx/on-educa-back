import { Request, Response } from 'express';
import { TemplateRepository } from '../../repositories/implementations/TemplateRepository';
import { DeleteTemplateService } from '../../services/template/DeleteTemplateService';

class DeleteTemplateController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteTemplateService = new DeleteTemplateService(new TemplateRepository());

    await deleteTemplateService.execute(id);

    return res.status(200).json({ message: 'Template removida' });
  }
}

export default new DeleteTemplateController();
