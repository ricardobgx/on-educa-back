import { DeleteResult } from 'typeorm';
import { IPracticeQuestionRequest } from '../../dto/IPracticeQuestionRequest';
import { PracticeQuestion } from '../../entities/PracticeQuestion';

export interface IPracticeQuestionRepository {
  createPracticeQuestion(
    practiceQuestionParams: IPracticeQuestionRequest
  ): Promise<PracticeQuestion>;
  findAll(name?: string): Promise<PracticeQuestion[]>;
  findById(id: string): Promise<PracticeQuestion | undefined>;
  updateById(updateFields: IPracticeQuestionRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
