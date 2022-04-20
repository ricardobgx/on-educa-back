import { DeleteResult } from 'typeorm';
import { IChatRequest } from '../../dto/chat/IChatRequest';
import { Chat } from '../../entities/Chat';

export interface IChatRepository {
  createChat(chatParams: IChatRequest): Promise<Chat>;
  findAll(name?: string): Promise<Chat[]>;
  findByPeople(peopleId: string): Promise<Chat[]>;
  findById(id: string): Promise<Chat | undefined>;
  getOrCreateChat(getOrCreateChatParams: IChatRequest): Promise<Chat>;
  updateById(updateFields: IChatRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
