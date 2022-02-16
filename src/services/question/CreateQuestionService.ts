import { getCustomRepository, ObjectType } from 'typeorm';
import { IQuestionRequest } from '../../dto/question/IQuestionRequest';
import { Question } from '../../entities/Question';
import { IQuestionRepository } from '../../repositories/interfaces/IQuestionRepository';

export class CreateQuestionService {
  questionRepository: IQuestionRepository;

  constructor(questionRepository: IQuestionRepository) {
    this.questionRepository = questionRepository;
  }

  async execute(questionParams: IQuestionRequest): Promise<Question> {
    const questionRepository = getCustomRepository(
      this.questionRepository as unknown as ObjectType<IQuestionRepository>
    );

    const question = await questionRepository.createQuestion(questionParams);

    return question;
  }
}
