import { getCustomRepository, ObjectType } from 'typeorm';
import { IMessageRequest } from '../../dto/message/IMessageRequest';
import { Message } from '../../entities/Message';
import { IMessageRepository } from '../../repositories/interfaces/IMessageRepository';

export class CreateMessageService {
  messageRepository: IMessageRepository;

  constructor(messageRepository: IMessageRepository) {
    this.messageRepository = messageRepository;
  }

  async execute(messageParams: IMessageRequest): Promise<Message> {
    const messageRepository = getCustomRepository(
      this.messageRepository as unknown as ObjectType<IMessageRepository>
    );

    const message = await messageRepository.createMessage(messageParams);

    return message;
  }
}
