import { IAlternativeRequest } from '../../dto/IAlternativeRequest';
import { Alternative } from '../../entities/Alternative';

export interface IAlternativeRepository {
  createAlternative(
    alternativeParams: IAlternativeRequest
  ): Promise<Alternative>;
  findAll(): Promise<Alternative[]>;
  findById(id: string): Promise<Alternative | undefined>;
  updateById(updateFields: IAlternativeRequest): Promise<void>;
}
