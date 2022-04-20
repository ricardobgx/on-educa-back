import { getCustomRepository, ObjectType } from 'typeorm';
import { ApplicationErrors } from '../../errors';
import { IDoubtCommentRepository } from '../../repositories/interfaces/IDoubtCommentRepository';

export class DeleteDoubtCommentService {
  doubtCommentRepository: IDoubtCommentRepository;

  constructor(doubtCommentRepository: IDoubtCommentRepository) {
    this.doubtCommentRepository = doubtCommentRepository;
  }

  async execute(id: string): Promise<void> {
    const doubtCommentRepository = getCustomRepository(
      this
        .doubtCommentRepository as unknown as ObjectType<IDoubtCommentRepository>
    );

    const doubtComment = await doubtCommentRepository.findById(id);

    if (!doubtComment) throw new ApplicationErrors('Entidade não existe!', 404);

    await doubtCommentRepository.deleteById(id);
  }
}
