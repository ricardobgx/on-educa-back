import { DeleteResult } from 'typeorm';
import { IDoubtRequest } from '../../dto/doubt/IDoubtRequest';
import { Doubt } from '../../entities/Doubt';

export interface IDoubtRepository {
  createDoubt(templateParams: IDoubtRequest): Promise<Doubt>;
  findAll(name?: string): Promise<Doubt[]>;
  findById(id: string): Promise<Doubt | undefined>;
  findByContent(contentId: string): Promise<Doubt[]>;
  updateById(updateFields: IDoubtRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
