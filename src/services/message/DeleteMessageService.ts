import { getCustomRepository, ObjectType } from 'typeorm';
import { ApplicationErrors } from '../../errors';
import { IMessageRepository } from '../../repositories/interfaces/IMessageRepository';

export class DeleteMessageService {
  messageRepository: IMessageRepository;

  constructor(messageRepository: IMessageRepository) {
    this.messageRepository = messageRepository;
  }

  async execute(id: string): Promise<void> {
    const messageRepository = getCustomRepository(
      this.messageRepository as unknown as ObjectType<IMessageRepository>
    );

    const message = await messageRepository.findById(id);

    if (!message) throw new ApplicationErrors('Entidade não existe!', 404);

    await messageRepository.deleteById(id);
  }
}
