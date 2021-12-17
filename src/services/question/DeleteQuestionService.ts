import { getCustomRepository, ObjectType } from 'typeorm';
import { ApplicationErrors } from '../../errors';
import { IQuestionRepository } from '../../repositories/interfaces/IQuestionRepository';

export class DeleteQuestionService {
  questionRepository: IQuestionRepository;

  constructor(questionRepository: IQuestionRepository) {
    this.questionRepository = questionRepository;
  }

  async execute(id: string): Promise<void> {
    const questionRepository = getCustomRepository(
      this.questionRepository as unknown as ObjectType<IQuestionRepository>
    );

    const question = await questionRepository.findById(id);

    if (!question) throw new ApplicationErrors('Entidade não existe!', 404);

    await questionRepository.deleteById(id);
  }
}
