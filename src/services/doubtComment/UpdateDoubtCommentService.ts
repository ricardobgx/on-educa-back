import { getCustomRepository, ObjectType } from 'typeorm';
import { IDoubtCommentRequest } from '../../dto/doubtComment/IDoubtCommentRequest';
import { ApplicationErrors } from '../../errors';
import { IDoubtCommentRepository } from '../../repositories/interfaces/IDoubtCommentRepository';

export class UpdateDoubtCommentService {
  doubtCommentRepository: IDoubtCommentRepository;

  constructor(doubtCommentRepository: IDoubtCommentRepository) {
    this.doubtCommentRepository = doubtCommentRepository;
  }

  async execute(doubtCommentParams: IDoubtCommentRequest): Promise<void> {
    const doubtCommentRepository = getCustomRepository(
      this
        .doubtCommentRepository as unknown as ObjectType<IDoubtCommentRepository>
    );

    const doubtComment = await doubtCommentRepository.findById(
      doubtCommentParams.id
    );

    if (!doubtComment) throw new ApplicationErrors('Entidade não existe', 404);

    await doubtCommentRepository.updateById(doubtCommentParams);
  }
}
