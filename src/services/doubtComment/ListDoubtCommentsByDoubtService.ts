import { getCustomRepository, ObjectType } from 'typeorm';
import { DoubtComment } from '../../entities/DoubtComment';
import { IDoubtCommentRepository } from '../../repositories/interfaces/IDoubtCommentRepository';

export class ListDoubtCommentsByDoubtService {
  doubtCommentRepository: IDoubtCommentRepository;

  constructor(doubtCommentRepository: IDoubtCommentRepository) {
    this.doubtCommentRepository = doubtCommentRepository;
  }

  async execute(doubtId): Promise<DoubtComment[]> {
    const doubtCommentRepository = getCustomRepository(
      this
        .doubtCommentRepository as unknown as ObjectType<IDoubtCommentRepository>
    );

    const doubtComments = doubtCommentRepository.findByDoubt(doubtId);

    return doubtComments;
  }
}
