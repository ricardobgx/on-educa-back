import { getCustomRepository, ObjectType } from 'typeorm';
import { DuelRoundQuestion } from '../../entities/DuelRoundQuestion';
import { IDuelRoundQuestionRepository } from '../../repositories/interfaces/IDuelRoundQuestionRepository';

export class ListDuelRoundQuestionService {
  duelRoundQuestionRepository: IDuelRoundQuestionRepository;

  constructor(duelRoundQuestionRepository: IDuelRoundQuestionRepository) {
    this.duelRoundQuestionRepository = duelRoundQuestionRepository;
  }

  async execute(): Promise<DuelRoundQuestion[]> {
    const duelRoundQuestionRepository = getCustomRepository(
      this
        .duelRoundQuestionRepository as unknown as ObjectType<IDuelRoundQuestionRepository>
    );

    const duelRoundQuestions = await duelRoundQuestionRepository.findAll();

    return duelRoundQuestions;
  }
}
