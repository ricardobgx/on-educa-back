import { getCustomRepository, ObjectType } from 'typeorm';
import { DuelQuestionAnswer } from '../../entities/DuelQuestionAnswer';
import { IDuelQuestionAnswerRepository } from '../../repositories/interfaces/IDuelQuestionAnswerRepository';

export class ListDuelQuestionAnswerService {
  duelQuestionAnswerRepository: IDuelQuestionAnswerRepository;

  constructor(duelQuestionAnswerRepository: IDuelQuestionAnswerRepository) {
    this.duelQuestionAnswerRepository = duelQuestionAnswerRepository;
  }

  async execute(): Promise<DuelQuestionAnswer[]> {
    const duelQuestionAnswerRepository = getCustomRepository(
      this
        .duelQuestionAnswerRepository as unknown as ObjectType<IDuelQuestionAnswerRepository>
    );

    const duelQuestionAnswers = await duelQuestionAnswerRepository.findAll();

    return duelQuestionAnswers;
  }
}
