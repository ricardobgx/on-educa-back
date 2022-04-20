import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IAlternativeRequest } from '../../dto/alternative/IAlternativeRequest';
import { IManyAlternatives } from '../../dto/alternative/IManyAlternatives';
import { Alternative } from '../../entities/Alternative';
import { IAlternativeRepository } from '../interfaces/IAlternativeRepository';
import { QuestionRepository } from './QuestionRepository';

@EntityRepository(Alternative)
export class AlternativeRepository
  extends Repository<Alternative>
  implements IAlternativeRepository
{
  async createAlternative(
    alternativeParams: IAlternativeRequest
  ): Promise<Alternative> {
    const { questionId } = alternativeParams;

    delete alternativeParams.questionId;

    let alternative = { ...alternativeParams };

    const questionRepository = await getCustomRepository(QuestionRepository);
    const question = await questionRepository.findById(questionId);

    if (question) alternative = this.create({ ...alternative, question });

    return await this.save(alternative);
  }

  async createManyAlternatives(
    alternativesParams: IManyAlternatives
  ): Promise<Alternative[]> {
    const { alternativesDescriptions, questionId } = alternativesParams;
    const alternatives: Alternative[] = [];

    await Promise.all(
      alternativesDescriptions.map(async (alternativeParams) => {
        await this.createAlternative({ ...alternativeParams, questionId }).then(
          (response) => {
            alternatives.push(response);
          }
        );
      })
    );

    return alternatives;
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
  async deleteById(id: string): Promise<DeleteResult> {
    return await this.delete({ id });
  }
}
