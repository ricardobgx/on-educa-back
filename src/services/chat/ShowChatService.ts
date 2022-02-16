import { getCustomRepository, ObjectType } from 'typeorm';
import { Chat } from '../../entities/Chat';
import { ApplicationErrors } from '../../errors';
import { IChatRepository } from '../../repositories/interfaces/IChatRepository';

export class ShowChatService {
  chatRepository: IChatRepository;

  constructor(chatRepository: IChatRepository) {
    this.chatRepository = chatRepository;
  }

  async execute(id: string): Promise<Chat> {
    const chatRepository = getCustomRepository(
      this.chatRepository as unknown as ObjectType<IChatRepository>
    );

    const chat = await chatRepository.findById(id);

    if (!chat) throw new ApplicationErrors('Entidade não existe', 404);

    return chat;
  }
}
