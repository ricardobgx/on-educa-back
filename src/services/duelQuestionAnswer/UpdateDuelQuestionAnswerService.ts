import { getCustomRepository, ObjectType } from 'typeorm';
import { IDuelQuestionAnswerRequest } from '../../dto/duelRoundQuestion/IDuelQuestionAnswerRequest';
import { ApplicationErrors } from '../../errors';
import { IDuelQuestionAnswerRepository } from '../../repositories/interfaces/IDuelQuestionAnswerRepository';

export class UpdateDuelQuestionAnswerService {
  duelQuestionAnswerRepository: IDuelQuestionAnswerRepository;

  constructor(duelQuestionAnswerRepository: IDuelQuestionAnswerRepository) {
    this.duelQuestionAnswerRepository = duelQuestionAnswerRepository;
  }

  async execute(
    duelQuestionAnswerParams: IDuelQuestionAnswerRequest
  ): Promise<void> {
    const duelQuestionAnswerRepository = getCustomRepository(
      this
        .duelQuestionAnswerRepository as unknown as ObjectType<IDuelQuestionAnswerRepository>
    );

    const duelQuestionAnswer = await duelQuestionAnswerRepository.findById(
      duelQuestionAnswerParams.id
    );

    if (!duelQuestionAnswer)
      throw new ApplicationErrors('Disciplina não existe', 404);

    await duelQuestionAnswerRepository.updateById(duelQuestionAnswerParams);
  }
}
