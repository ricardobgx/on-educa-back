import { DeleteResult } from 'typeorm';
import { IDuelRoundRequest } from '../../dto/duelRound/IDuelRoundRequest';
import { IAnswerDuelRoundQuestionRequest } from '../../dto/duelRoundQuestion/IAnswerDuelRoundQuestionRequest';
import { DuelRound } from '../../entities/DuelRound';

export interface IDuelRoundRepository {
  createDuelRound(duelRoundParams: IDuelRoundRequest): Promise<DuelRound>;
  findAll(name?: string): Promise<DuelRound[]>;
  findById(id: string): Promise<DuelRound | undefined>;
  updateById(updateFields: IDuelRoundRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
  startDuelRound(duelRoundId: string): Promise<void>;
  answerDuelRoundQuestion(
    answerDuelRoundQuestionParams: IAnswerDuelRoundQuestionRequest
  ): Promise<void>;
}
