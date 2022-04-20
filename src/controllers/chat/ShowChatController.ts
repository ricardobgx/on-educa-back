import { Request, Response } from 'express';
import { ChatRepository } from '../../repositories/implementations/ChatRepository';
import { ShowChatService } from '../../services/chat/ShowChatService';

class ShowChatController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showChatService = new ShowChatService(new ChatRepository());

    const chat = await showChatService.execute(id);

    return res.status(200).json(chat);
  }
}

export default new ShowChatController();
