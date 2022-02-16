import { Request, Response } from 'express';
import { MessageRepository } from '../../repositories/implementations/MessageRepository';
import { DeleteMessageService } from '../../services/message/DeleteMessageService';

class DeleteMessageController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteMessageService = new DeleteMessageService(
      new MessageRepository()
    );

    await deleteMessageService.execute(id);

    return res.status(200).json({ message: 'Disciplina removida!' });
  }
}

export default new DeleteMessageController();
