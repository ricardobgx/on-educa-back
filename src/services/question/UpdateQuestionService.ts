import { getCustomRepository, ObjectType } from 'typeorm';
import { IQuestionRequest } from '../../dto/IQuestionRequest';
import { ApplicationErrors } from '../../errors';
import { IQuestionRepository } from '../../repositories/interfaces/IQuestionRepository';

export class UpdateQuestionService {
  questionRepository: IQuestionRepository;

  constructor(questionRepository: IQuestionRepository) {
    this.questionRepository = questionRepository;
  }

  async execute(questionParams: IQuestionRequest): Promise<void> {
    const questionRepository = getCustomRepository(
      this.questionRepository as unknown as ObjectType<IQuestionRepository>
    );

    const question = await questionRepository.findById(questionParams.id);

    if (!question) throw new ApplicationErrors('Disciplina não existe', 404);

    await questionRepository.updateById(questionParams);
  }
}
