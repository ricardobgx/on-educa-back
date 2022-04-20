import { Request, Response } from 'express';

import { IChatRequest } from '../../dto/chat/IChatRequest';
import { ChatRepository } from '../../repositories/implementations/ChatRepository';
import { CreateChatService } from '../../services/chat/CreateChatService';

class CreateChatController {
  async handle(req: Request, res: Response) {
    const { chatCreatorId, chatParticipantId } = req.body as IChatRequest;

    const createChatService = new CreateChatService(new ChatRepository());

    const chat = await createChatService.execute({
      chatCreatorId,
      chatParticipantId,
    });

    return res.status(201).json(chat);
  }
}

export default new CreateChatController();
