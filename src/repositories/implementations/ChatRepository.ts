import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IChatRequest } from '../../dto/chat/IChatRequest';
import { Chat } from '../../entities/Chat';
import { ApplicationErrors } from '../../errors';
import { IChatRepository } from '../interfaces/IChatRepository';
import { MessageRepository } from './MessageRepository';
import { PeopleRepository } from './PeopleRepository';

@EntityRepository(Chat)
export class ChatRepository
  extends Repository<Chat>
  implements IChatRepository
{
  async createChat(chatParams: IChatRequest): Promise<Chat> {
    const { chatCreatorId, chatParticipantId } = chatParams;

    if (!chatCreatorId || !chatParticipantId) {
      throw new ApplicationErrors(
        'Participantes da conversa não informados',
        400
      );
    }

    const peopleRepository = await getCustomRepository(PeopleRepository);

    const chatCreator = await peopleRepository.findById(chatCreatorId);
    if (!chatCreator) {
      throw new ApplicationErrors('Criador da conversa não encotrado', 404);
    }

    const chatParticipant = await peopleRepository.findById(chatParticipantId);
    if (!chatParticipant) {
      throw new ApplicationErrors(
        'Participante da conversa não encotrado',
        404
      );
    }

    const chat = this.create({
      chatCreator,
      chatParticipant,
      createdAt: new Date(),
    });

    // Salva a conversa na base de dados e retorna
    return await this.save(chat);
  }

  async findAll(): Promise<Chat[]> {
    return await this.find({
      relations: ['chatCreator', 'chatParticipant', 'messages'],
    });
  }

  async findByPeople(peopleId: string): Promise<Chat[]> {
    const peopleRepository = await getCustomRepository(PeopleRepository);
    const people = await peopleRepository.findById(peopleId);

    if (!people) {
      throw new ApplicationErrors('Pessoa não encontrada', 404);
    }

    const createdChats = await this.find({
      where: {
        chatCreator: people,
      },
      relations: ['chatCreator', 'chatParticipant', 'messages'],
    });

    const participatedChats = await this.find({
      where: {
        chatParticipant: people,
      },
      relations: ['chatCreator', 'chatParticipant', 'messages'],
    });

    const chatsFound = [...createdChats, ...participatedChats];

    const chats: Chat[] = [];

    const messageRepository = await getCustomRepository(MessageRepository);

    await Promise.all(
      chatsFound.map(async (chatFound) => {
        const messages = await messageRepository.findByChat(chatFound.id);
        chats.push({ ...chatFound, messages });
      })
    );

    return chats;
  }

  async getOrCreateChat(getOrCreateChatParams: IChatRequest): Promise<Chat> {
    console.log('pegando chat');

    const { chatCreatorId, chatParticipantId } = getOrCreateChatParams;

    const creatorChats = await this.findByPeople(chatCreatorId);

    const participantChatParticipated = creatorChats.find(
      (chat) => chat.chatParticipant.id === chatParticipantId
    );

    if (participantChatParticipated) {
      return participantChatParticipated;
    }

    const participantChatCreated = creatorChats.find(
      (chat) => chat.chatCreator.id === chatParticipantId
    );

    if (participantChatCreated) {
      return participantChatCreated;
    }

    return await this.createChat({
      chatCreatorId,
      chatParticipantId,
    });
  }

  async findById(id: string): Promise<Chat | undefined> {
    const Chat = await this.findOne(
      { id },
      { relations: ['chatCreator', 'chatParticipant', 'messages'] }
    );

    return Chat;
  }

  async updateById(updateFields: IChatRequest): Promise<void> {
    const { id } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      (key: string) => fields[key] === undefined && delete fields[key]
    );

    await this.update({ id }, fields);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return await this.delete({ id });
  }
}
