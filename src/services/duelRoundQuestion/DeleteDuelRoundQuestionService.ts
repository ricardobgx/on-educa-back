import { getCustomRepository, ObjectType } from 'typeorm';
import { ApplicationErrors } from '../../errors';
import { IDuelRoundQuestionRepository } from '../../repositories/interfaces/IDuelRoundQuestionRepository';

export class DeleteDuelRoundQuestionService {
  duelRoundQuestionRepository: IDuelRoundQuestionRepository;

  constructor(DuelRoundQuestionRepository: IDuelRoundQuestionRepository) {
    this.duelRoundQuestionRepository = DuelRoundQuestionRepository;
  }

  async execute(id: string): Promise<void> {
    const duelRoundQuestionRepository = getCustomRepository(
      this
        .duelRoundQuestionRepository as unknown as ObjectType<IDuelRoundQuestionRepository>
    );

    const duelRoundQuestion = await duelRoundQuestionRepository.findById(id);

    if (!duelRoundQuestion)
      throw new ApplicationErrors('Entidade não existe!', 404);

    await duelRoundQuestionRepository.deleteById(id);
  }
}
