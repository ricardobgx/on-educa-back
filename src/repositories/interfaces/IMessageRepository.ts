import { DeleteResult } from 'typeorm';
import { IMessageRequest } from '../../dto/message/IMessageRequest';
import { Message } from '../../entities/Message';

export interface IMessageRepository {
  createMessage(messageParams: IMessageRequest): Promise<Message>;
  findAll(name?: string): Promise<Message[]>;
  findById(id: string): Promise<Message | undefined>;
  updateById(updateFields: IMessageRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
