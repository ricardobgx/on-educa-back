import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IMessageRequest } from '../../dto/message/IMessageRequest';
import { Message } from '../../entities/Message';
import { ApplicationErrors } from '../../errors';
import { IMessageRepository } from '../interfaces/IMessageRepository';
import { ChatRepository } from './ChatRepository';
import { PeopleRepository } from './PeopleRepository';

@EntityRepository(Message)
export class MessageRepository
  extends Repository<Message>
  implements IMessageRepository
{
  async createMessage(messageParams: IMessageRequest): Promise<Message> {
    const { content, senderId, chatId } = messageParams;

    if (!content) {
      throw new ApplicationErrors(
        'O conteúdo da mensagem não foi informado',
        400
      );
    }

    if (!senderId) {
      throw new ApplicationErrors('A pessoa que enviou não foi informada', 400);
    }

    if (!chatId) {
      throw new ApplicationErrors('A conversa não foi informada', 400);
    }

    const peopleRepository = await getCustomRepository(PeopleRepository);
    const sender = await peopleRepository.findById(senderId);

    const chatRepository = await getCustomRepository(ChatRepository);
    const chat = await chatRepository.findById(chatId);

    const message = this.create({
      content,
      sender,
      chat,
      createdAt: new Date(),
    });

    // Salva a pratica na base de dados e retorna
    return await this.save(message);
  }

  async findAll(): Promise<Message[]> {
    return await this.find({
      relations: ['sender', 'chat'],
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async findByChat(chatId: string): Promise<Message[]> {
    const chatRepository = await getCustomRepository(ChatRepository);
    const chat = await chatRepository.findById(chatId);

    return await this.find({
      where: {
        chat,
      },
      relations: ['sender', 'chat'],
      order: {
        createdAt: 'DESC',
      },
      take: 10,
    });
  }

  async findById(id: string): Promise<Message | undefined> {
    const Message = await this.findOne(
      { id },
      { relations: ['sender', 'chat'] }
    );

    return Message;
  }

  async updateById(updateFields: IMessageRequest): Promise<void> {
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
