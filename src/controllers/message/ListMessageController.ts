import { Request, Response } from 'express';
import { MessageRepository } from '../../repositories/implementations/MessageRepository';
import { ListMessageService } from '../../services/message/ListMessageService';

class ListMessageController {
  async handle(req: Request, res: Response) {
    const listMessageService = new ListMessageService(new MessageRepository());

    const messages = await listMessageService.execute();

    return res.status(200).json(messages);
  }
}

export default new ListMessageController();
