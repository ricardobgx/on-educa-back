import { Request, Response } from 'express';
import { MessageRepository } from '../../repositories/implementations/MessageRepository';
import { ShowMessageService } from '../../services/message/ShowMessageService';

class ShowMessageController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showMessageService = new ShowMessageService(new MessageRepository());

    const message = await showMessageService.execute(id);

    return res.status(200).json(message);
  }
}

export default new ShowMessageController();
