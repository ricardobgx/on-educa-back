import { Request, Response } from 'express';
import { ChatRepository } from '../../repositories/implementations/ChatRepository';
import { DeleteChatService } from '../../services/chat/DeleteChatService';

class DeleteChatController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteChatService = new DeleteChatService(new ChatRepository());

    await deleteChatService.execute(id);

    return res.status(200).json({ message: 'Conversa removida!' });
  }
}

export default new DeleteChatController();
