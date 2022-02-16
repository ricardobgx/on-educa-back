import { getCustomRepository, ObjectType } from 'typeorm';
import { ApplicationErrors } from '../../errors';
import { IChatRepository } from '../../repositories/interfaces/IChatRepository';

export class DeleteChatService {
  chatRepository: IChatRepository;

  constructor(chatRepository: IChatRepository) {
    this.chatRepository = chatRepository;
  }

  async execute(id: string): Promise<void> {
    const chatRepository = getCustomRepository(
      this.chatRepository as unknown as ObjectType<IChatRepository>
    );

    const chat = await chatRepository.findById(id);

    if (!chat) throw new ApplicationErrors('Entidade não existe!', 404);

    await chatRepository.deleteById(id);
  }
}
