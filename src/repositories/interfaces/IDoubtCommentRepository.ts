import { DeleteResult } from 'typeorm';
import { IDoubtCommentRequest } from '../../dto/doubtComment/IDoubtCommentRequest';
import { DoubtComment } from '../../entities/DoubtComment';

export interface IDoubtCommentRepository {
  createDoubtComment(
    doubtCommentParams: IDoubtCommentRequest
  ): Promise<DoubtComment>;
  findAll(name?: string): Promise<DoubtComment[]>;
  findByDoubt(doubtId: string): Promise<DoubtComment[]>;
  findById(id: string): Promise<DoubtComment | undefined>;
  updateById(updateFields: IDoubtCommentRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
