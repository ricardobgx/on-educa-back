import { getCustomRepository, ObjectType } from 'typeorm';
import { DoubtComment } from '../../entities/DoubtComment';
import { IDoubtCommentRepository } from '../../repositories/interfaces/IDoubtCommentRepository';

export class ListDoubtCommentService {
  doubtCommentRepository: IDoubtCommentRepository;

  constructor(doubtCommentRepository: IDoubtCommentRepository) {
    this.doubtCommentRepository = doubtCommentRepository;
  }

  async execute(): Promise<DoubtComment[]> {
    const doubtCommentRepository = getCustomRepository(
      this
        .doubtCommentRepository as unknown as ObjectType<IDoubtCommentRepository>
    );

    const doubtComments = await doubtCommentRepository.findAll();

    return doubtComments;
  }
}
