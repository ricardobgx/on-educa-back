import { getCustomRepository, ObjectType } from 'typeorm';
import { Message } from '../../entities/Message';
import { IMessageRepository } from '../../repositories/interfaces/IMessageRepository';

export class ListMessageService {
  messageRepository: IMessageRepository;

  constructor(messageRepository: IMessageRepository) {
    this.messageRepository = messageRepository;
  }

  async execute(): Promise<Message[]> {
    const messageRepository = getCustomRepository(
      this.messageRepository as unknown as ObjectType<IMessageRepository>
    );

    const messages = await messageRepository.findAll();

    return messages;
  }
}
