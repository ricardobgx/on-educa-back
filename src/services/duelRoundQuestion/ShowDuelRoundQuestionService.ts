import { getCustomRepository, ObjectType } from 'typeorm';
import { DuelRoundQuestion } from '../../entities/DuelRoundQuestion';
import { ApplicationErrors } from '../../errors';
import { IDuelRoundQuestionRepository } from '../../repositories/interfaces/IDuelRoundQuestionRepository';

export class ShowDuelRoundQuestionService {
  duelRoundQuestionRepository: IDuelRoundQuestionRepository;

  constructor(duelRoundQuestionRepository: IDuelRoundQuestionRepository) {
    this.duelRoundQuestionRepository = duelRoundQuestionRepository;
  }

  async execute(id: string): Promise<DuelRoundQuestion> {
    const duelRoundQuestionRepository = getCustomRepository(
      this
        .duelRoundQuestionRepository as unknown as ObjectType<IDuelRoundQuestionRepository>
    );

    const duelRoundQuestion = await duelRoundQuestionRepository.findById(id);

    if (!duelRoundQuestion)
      throw new ApplicationErrors('Entidade não existe', 404);

    return duelRoundQuestion;
  }
}
