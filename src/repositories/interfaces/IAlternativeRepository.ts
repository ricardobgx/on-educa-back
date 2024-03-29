import { DeleteResult } from 'typeorm';
import { IAlternativeRequest } from '../../dto/alternative/IAlternativeRequest';
import { IManyAlternatives } from '../../dto/alternative/IManyAlternatives';
import { Alternative } from '../../entities/Alternative';

export interface IAlternativeRepository {
  createAlternative(
    alternativeParams: IAlternativeRequest
  ): Promise<Alternative>;
  createManyAlternatives(
    alternativesParams: IManyAlternatives
  ): Promise<Alternative[]>;
  findAll(): Promise<Alternative[]>;
  findById(id: string): Promise<Alternative | undefined>;
  updateById(updateFields: IAlternativeRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
