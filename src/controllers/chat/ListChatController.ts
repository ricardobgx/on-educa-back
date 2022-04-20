import { Request, Response } from 'express';
import { ChatRepository } from '../../repositories/implementations/ChatRepository';
import { ListChatService } from '../../services/chat/ListChatService';

class ListChatController {
  async handle(req: Request, res: Response) {
    const listChatService = new ListChatService(new ChatRepository());

    const chats = await listChatService.execute();

    return res.status(200).json(chats);
  }
}

export default new ListChatController();
