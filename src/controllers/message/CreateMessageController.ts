import { Request, Response } from 'express';

import { IMessageRequest } from '../../dto/message/IMessageRequest';
import { MessageRepository } from '../../repositories/implementations/MessageRepository';
import { CreateMessageService } from '../../services/message/CreateMessageService';

class CreateMessageController {
  async handle(req: Request, res: Response) {
    const { content, senderId, chatId } = req.body as IMessageRequest;

    const createMessageService = new CreateMessageService(
      new MessageRepository()
    );

    const message = await createMessageService.execute({
      content,
      senderId,
      chatId,
    });

    return res.status(201).json(message);
  }
}

export default new CreateMessageController();
