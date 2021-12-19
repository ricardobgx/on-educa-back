import { EntityRepository, Repository } from 'typeorm';
import { IAlternativeRequest } from '../../dto/IAlternativeRequest';
import { Alternative } from '../../entities/Alternative';
import { IAlternativeRepository } from '../interfaces/IAlternativeRepository';

@EntityRepository(Alternative)
export class AlternativeRepository
  extends Repository<Alternative>
  implements IAlternativeRepository
{
  async createAlternative(
    alternativeParams: IAlternativeRequest
  ): Promise<Alternative> {
    const alternative = await this.save(alternativeParams);

    return alternative;
  }
  async findAll(): Promise<Alternative[]> {
    return await this.find({ relations: ['question'] });
  }
  async findById(id: string): Promise<Alternative> {
    return await this.findOne({ id }, { relations: ['question'] });
  }
  async updateById(updateFields: IAlternativeRequest): Promise<void> {
    const { id } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      (key) => fields[key] === undefined && delete fields[key]
    );

    await this.update({ id }, fields);
  }
}
