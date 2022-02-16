import { getCustomRepository, ObjectType } from 'typeorm';
import { Chat } from '../../entities/Chat';
import { IChatRepository } from '../../repositories/interfaces/IChatRepository';

export class ListChatService {
  chatRepository: IChatRepository;

  constructor(chatRepository: IChatRepository) {
    this.chatRepository = chatRepository;
  }

  async execute(): Promise<Chat[]> {
    const chatRepository = getCustomRepository(
      this.chatRepository as unknown as ObjectType<IChatRepository>
    );

    const chats = await chatRepository.findAll();

    return chats;
  }
}
