import { Request, Response } from 'express';
import { ChatRepository } from '../../repositories/implementations/ChatRepository';
import { ListChatByPeopleService } from '../../services/chat/ListChatByPeopleService';

class ListChatByPeopleController {
  async handle(req: Request, res: Response) {
    const { peopleId } = req.params;

    const listChatService = new ListChatByPeopleService(new ChatRepository());

    const chats = await listChatService.execute(peopleId);

    return res.status(200).json(chats);
  }
}

export default new ListChatByPeopleController();
