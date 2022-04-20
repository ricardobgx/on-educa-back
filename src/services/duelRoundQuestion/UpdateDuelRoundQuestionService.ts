import { getCustomRepository, ObjectType } from 'typeorm';
import { IDuelRoundQuestionRequest } from '../../dto/duelRoundQuestion/IDuelRoundQuestionRequest';
import { ApplicationErrors } from '../../errors';
import { IDuelRoundQuestionRepository } from '../../repositories/interfaces/IDuelRoundQuestionRepository';

export class UpdateDuelRoundQuestionService {
  duelRoundQuestionRepository: IDuelRoundQuestionRepository;

  constructor(duelRoundQuestionRepository: IDuelRoundQuestionRepository) {
    this.duelRoundQuestionRepository = duelRoundQuestionRepository;
  }

  async execute(
    duelRoundQuestionParams: IDuelRoundQuestionRequest
  ): Promise<void> {
    const duelRoundQuestionRepository = getCustomRepository(
      this
        .duelRoundQuestionRepository as unknown as ObjectType<IDuelRoundQuestionRepository>
    );

    const duelRoundQuestion = await duelRoundQuestionRepository.findById(
      duelRoundQuestionParams.id
    );

    if (!duelRoundQuestion)
      throw new ApplicationErrors('Disciplina não existe', 404);

    await duelRoundQuestionRepository.updateById(duelRoundQuestionParams);
  }
}
