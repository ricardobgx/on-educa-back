import { DeleteResult } from 'typeorm';
import { IPracticeQuestionAnswerRequest } from '../../dto/IPracticeQuestionAnswerRequest';
import { PracticeQuestionAnswer } from '../../entities/PracticeQuestionAnswer';

export interface IPracticeQuestionAnswerRepository {
  createPracticeQuestionAnswer(
    practiceQuestionAnswerParams: IPracticeQuestionAnswerRequest
  ): Promise<PracticeQuestionAnswer>;
  findAll(name?: string): Promise<PracticeQuestionAnswer[]>;
  findById(id: string): Promise<PracticeQuestionAnswer | undefined>;
  updateById(updateFields: IPracticeQuestionAnswerRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
