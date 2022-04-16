import { getCustomRepository, ObjectType } from 'typeorm';
import { IDoubtCommentRequest } from '../../dto/doubtComment/IDoubtCommentRequest';
import { DoubtComment } from '../../entities/DoubtComment';
import { IDoubtCommentRepository } from '../../repositories/interfaces/IDoubtCommentRepository';

export class CreateDoubtCommentService {
  doubtCommentRepository: IDoubtCommentRepository;

  constructor(doubtCommentRepository: IDoubtCommentRepository) {
    this.doubtCommentRepository = doubtCommentRepository;
  }

  async execute(
    doubtCommentParams: IDoubtCommentRequest
  ): Promise<DoubtComment> {
    const doubtCommentRepository = getCustomRepository(
      this
        .doubtCommentRepository as unknown as ObjectType<IDoubtCommentRepository>
    );

    const doubtComment = await doubtCommentRepository.createDoubtComment(
      doubtCommentParams
    );

    return doubtComment;
  }
}
