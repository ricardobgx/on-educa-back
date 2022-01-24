import { getCustomRepository, ObjectType } from 'typeorm';
import { Question } from '../../entities/Question';
import { IQuestionRepository } from '../../repositories/interfaces/IQuestionRepository';

export class GetPracticeQuestionService {
  questionRepository: IQuestionRepository;

  constructor(questionRepository: IQuestionRepository) {
    this.questionRepository = questionRepository;
  }

  async execute(contentId: string): Promise<Question[]> {
    const questionRepository = getCustomRepository(
      this.questionRepository as unknown as ObjectType<IQuestionRepository>
    );

    const questions = await questionRepository.getPracticeQuestions(contentId);

    return questions;
  }
}
