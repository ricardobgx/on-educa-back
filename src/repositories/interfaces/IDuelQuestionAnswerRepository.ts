import { DeleteResult } from 'typeorm';
import { IDuelQuestionAnswerRequest } from '../../dto/IDuelQuestionAnswerRequest';
import { DuelQuestionAnswer } from '../../entities/DuelQuestionAnswer';

export interface IDuelQuestionAnswerRepository {
  createDuelQuestionAnswer(
    duelQuestionAnswerParams: IDuelQuestionAnswerRequest
  ): Promise<DuelQuestionAnswer>;
  findAll(name?: string): Promise<DuelQuestionAnswer[]>;
  findById(id: string): Promise<DuelQuestionAnswer | undefined>;
  updateById(updateFields: IDuelQuestionAnswerRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
