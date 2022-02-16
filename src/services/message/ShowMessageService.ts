import { getCustomRepository, ObjectType } from 'typeorm';
import { Message } from '../../entities/Message';
import { ApplicationErrors } from '../../errors';
import { IMessageRepository } from '../../repositories/interfaces/IMessageRepository';

export class ShowMessageService {
  messageRepository: IMessageRepository;

  constructor(messageRepository: IMessageRepository) {
    this.messageRepository = messageRepository;
  }

  async execute(id: string): Promise<Message> {
    const messageRepository = getCustomRepository(
      this.messageRepository as unknown as ObjectType<IMessageRepository>
    );

    const message = await messageRepository.findById(id);

    if (!message) throw new ApplicationErrors('Entidade não existe', 404);

    return message;
  }
}
