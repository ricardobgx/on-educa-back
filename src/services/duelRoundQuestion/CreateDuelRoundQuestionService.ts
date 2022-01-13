import { hash } from 'bcryptjs';
import { getCustomRepository, ObjectType } from 'typeorm';
import { IDuelRoundQuestionRequest } from '../../dto/IDuelRoundQuestionRequest';
import { DuelRoundQuestion } from '../../entities/DuelRoundQuestion';
import { IDuelRoundQuestionRepository } from '../../repositories/interfaces/IDuelRoundQuestionRepository';

export class CreateDuelRoundQuestionService {
  duelRoundQuestionRepository: IDuelRoundQuestionRepository;

  constructor(duelRoundQuestionRepository: IDuelRoundQuestionRepository) {
    this.duelRoundQuestionRepository = duelRoundQuestionRepository;
  }

  async execute(
    duelRoundQuestionParams: IDuelRoundQuestionRequest
  ): Promise<DuelRoundQuestion> {
    const duelRoundQuestionRepository = getCustomRepository(
      this
        .duelRoundQuestionRepository as unknown as ObjectType<IDuelRoundQuestionRepository>
    );

    const duelRoundQuestion =
      await duelRoundQuestionRepository.createDuelRoundQuestion(
        duelRoundQuestionParams
      );

    return duelRoundQuestion;
  }
}
