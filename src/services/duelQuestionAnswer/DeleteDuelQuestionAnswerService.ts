import { getCustomRepository, ObjectType } from 'typeorm';
import { ApplicationErrors } from '../../errors';
import { IDuelQuestionAnswerRepository } from '../../repositories/interfaces/IDuelQuestionAnswerRepository';

export class DeleteDuelQuestionAnswerService {
  duelQuestionAnswerRepository: IDuelQuestionAnswerRepository;

  constructor(DuelQuestionAnswerRepository: IDuelQuestionAnswerRepository) {
    this.duelQuestionAnswerRepository = DuelQuestionAnswerRepository;
  }

  async execute(id: string): Promise<void> {
    const duelQuestionAnswerRepository = getCustomRepository(
      this
        .duelQuestionAnswerRepository as unknown as ObjectType<IDuelQuestionAnswerRepository>
    );

    const duelQuestionAnswer = await duelQuestionAnswerRepository.findById(id);

    if (!duelQuestionAnswer)
      throw new ApplicationErrors('Entidade não existe!', 404);

    await duelQuestionAnswerRepository.deleteById(id);
  }
}
