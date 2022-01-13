import { DeleteResult } from 'typeorm';
import { IDuelRoundQuestionRequest } from '../../dto/IDuelRoundQuestionRequest';
import { DuelRoundQuestion } from '../../entities/DuelRoundQuestion';

export interface IDuelRoundQuestionRepository {
  createDuelRoundQuestion(
    duelRoundQuestionParams: IDuelRoundQuestionRequest
  ): Promise<DuelRoundQuestion>;
  findAll(name?: string): Promise<DuelRoundQuestion[]>;
  findById(id: string): Promise<DuelRoundQuestion | undefined>;
  findByDuelRoundId(duelRoundId: string): Promise<DuelRoundQuestion[]>;
  updateById(updateFields: IDuelRoundQuestionRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
