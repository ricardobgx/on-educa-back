import { getCustomRepository, ObjectType } from 'typeorm';
import { DoubtComment } from '../../entities/DoubtComment';
import { ApplicationErrors } from '../../errors';
import { IDoubtCommentRepository } from '../../repositories/interfaces/IDoubtCommentRepository';

export class ShowDoubtCommentService {
  doubtCommentRepository: IDoubtCommentRepository;

  constructor(doubtCommentRepository: IDoubtCommentRepository) {
    this.doubtCommentRepository = doubtCommentRepository;
  }

  async execute(id: string): Promise<DoubtComment> {
    const doubtCommentRepository = getCustomRepository(
      this
        .doubtCommentRepository as unknown as ObjectType<IDoubtCommentRepository>
    );

    const doubtComment = await doubtCommentRepository.findById(id);

    if (!doubtComment) throw new ApplicationErrors('Entidade não existe', 404);

    return doubtComment;
  }
}
