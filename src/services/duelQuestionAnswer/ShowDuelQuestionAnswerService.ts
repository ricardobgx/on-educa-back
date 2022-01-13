import { getCustomRepository, ObjectType } from 'typeorm';
import { DuelQuestionAnswer } from '../../entities/DuelQuestionAnswer';
import { ApplicationErrors } from '../../errors';
import { IDuelQuestionAnswerRepository } from '../../repositories/interfaces/IDuelQuestionAnswerRepository';

export class ShowDuelQuestionAnswerService {
  duelQuestionAnswerRepository: IDuelQuestionAnswerRepository;

  constructor(duelQuestionAnswerRepository: IDuelQuestionAnswerRepository) {
    this.duelQuestionAnswerRepository = duelQuestionAnswerRepository;
  }

  async execute(id: string): Promise<DuelQuestionAnswer> {
    const duelQuestionAnswerRepository = getCustomRepository(
      this
        .duelQuestionAnswerRepository as unknown as ObjectType<IDuelQuestionAnswerRepository>
    );

    const duelQuestionAnswer = await duelQuestionAnswerRepository.findById(id);

    if (!duelQuestionAnswer)
      throw new ApplicationErrors('Entidade não existe', 404);

    return duelQuestionAnswer;
  }
}
