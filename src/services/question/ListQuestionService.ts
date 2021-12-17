import { getCustomRepository, ObjectType } from 'typeorm';
import { Question } from '../../entities/Question';
import { IQuestionRepository } from '../../repositories/interfaces/IQuestionRepository';

export class ListQuestionService {
  questionRepository: IQuestionRepository;

  constructor(questionRepository: IQuestionRepository) {
    this.questionRepository = questionRepository;
  }

  async execute(): Promise<Question[]> {
    const questionRepository = getCustomRepository(
      this.questionRepository as unknown as ObjectType<IQuestionRepository>
    );

    const questions = await questionRepository.findAll();

    return questions;
  }
}
