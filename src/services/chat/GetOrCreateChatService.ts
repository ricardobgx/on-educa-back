import { getCustomRepository, ObjectType } from 'typeorm';
import { IChatRequest } from '../../dto/chat/IChatRequest';
import { Chat } from '../../entities/Chat';
import { IChatRepository } from '../../repositories/interfaces/IChatRepository';

export class GetOrCreateChatService {
  chatRepository: IChatRepository;

  constructor(chatRepository: IChatRepository) {
    this.chatRepository = chatRepository;
  }

  async execute(chatParams: IChatRequest): Promise<Chat> {
    const chatRepository = getCustomRepository(
      this.chatRepository as unknown as ObjectType<IChatRepository>
    );

    const chat = await chatRepository.getOrCreateChat(chatParams);

    return chat;
  }
}
