import { getCustomRepository, ObjectType } from 'typeorm';
import { IDuelQuestionAnswerRequest } from '../../dto/IDuelQuestionAnswerRequest';
import { DuelQuestionAnswer } from '../../entities/DuelQuestionAnswer';
import { IDuelQuestionAnswerRepository } from '../../repositories/interfaces/IDuelQuestionAnswerRepository';

export class CreateDuelQuestionAnswerService {
  duelQuestionAnswerRepository: IDuelQuestionAnswerRepository;

  constructor(duelQuestionAnswerRepository: IDuelQuestionAnswerRepository) {
    this.duelQuestionAnswerRepository = duelQuestionAnswerRepository;
  }

  async execute(
    duelQuestionAnswerParams: IDuelQuestionAnswerRequest
  ): Promise<DuelQuestionAnswer> {
    const duelQuestionAnswerRepository = getCustomRepository(
      this
        .duelQuestionAnswerRepository as unknown as ObjectType<IDuelQuestionAnswerRepository>
    );

    const duelQuestionAnswer =
      await duelQuestionAnswerRepository.createDuelQuestionAnswer(
        duelQuestionAnswerParams
      );

    return duelQuestionAnswer;
  }
}
