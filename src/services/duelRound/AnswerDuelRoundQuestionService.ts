import { getCustomRepository, ObjectType } from 'typeorm';
import { IAnswerDuelRoundQuestionRequest } from '../../dto/duelRoundQuestion/IAnswerDuelRoundQuestionRequest';
import { IDuelRoundRepository } from '../../repositories/interfaces/IDuelRoundRepository';

export class AnswerDuelRoundQuestionService {
  duelRoundRepository: IDuelRoundRepository;

  constructor(duelRoundRepository: IDuelRoundRepository) {
    this.duelRoundRepository = duelRoundRepository;
  }

  async execute(
    answerDuelRoundQuestionParams: IAnswerDuelRoundQuestionRequest
  ): Promise<void> {
    const duelRoundRepository = getCustomRepository(
      this.duelRoundRepository as unknown as ObjectType<IDuelRoundRepository>
    );

    await duelRoundRepository.answerDuelRoundQuestion(
      answerDuelRoundQuestionParams
    );
  }
}
