import { DeleteResult } from 'typeorm';
import { IQuestionRequest } from '../../dto/question/IQuestionRequest';
import { Question } from '../../entities/Question';

export interface IQuestionRepository {
  createQuestion(questionParams: IQuestionRequest): Promise<Question>;
  findAll(): Promise<Question[]>;
  findByContent(contentId: string): Promise<Question[]>;
  findById(id: string): Promise<Question | undefined>;
  getPracticeQuestions(contentId: string): Promise<Question[]>;
  updateById(updateFields: IQuestionRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
