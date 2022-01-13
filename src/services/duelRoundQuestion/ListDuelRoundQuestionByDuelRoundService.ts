import { getCustomRepository, ObjectType } from 'typeorm';
import { DuelRoundQuestion } from '../../entities/DuelRoundQuestion';
import { IDuelRoundQuestionRepository } from '../../repositories/interfaces/IDuelRoundQuestionRepository';

export class ListDuelRoundQuestionByContentService {
  duelRoundQuestionRepository: IDuelRoundQuestionRepository;

  constructor(duelRoundQuestionRepository: IDuelRoundQuestionRepository) {
    this.duelRoundQuestionRepository = duelRoundQuestionRepository;
  }

  async execute(duelRoundId: string): Promise<DuelRoundQuestion[]> {
    const duelRoundQuestionRepository = getCustomRepository(
      this
        .duelRoundQuestionRepository as unknown as ObjectType<IDuelRoundQuestionRepository>
    );

    const duelRoundQuestions =
      await duelRoundQuestionRepository.findByDuelRoundId(duelRoundId);

    return duelRoundQuestions;
  }
}
