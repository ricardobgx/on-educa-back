import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IQuestionRequest } from '../../dto/IQuestionRequest';
import { Alternative } from '../../entities/Alternative';
import { Question } from '../../entities/Question';
import { IQuestionRepository } from '../interfaces/IQuestionRepository';
import { AlternativeRepository } from './AlternativeRepository';
import { ContentRepository } from './ContentRepository';

@EntityRepository(Question)
export class QuestionRepository
  extends Repository<Question>
  implements IQuestionRepository
{
  async createQuestion(questionParams: IQuestionRequest): Promise<Question> {
    const { contentId, alternativesDescriptions } = questionParams;

    delete questionParams.contentId;
    delete questionParams.alternativesDescriptions;

    let question = { ...questionParams };

    const contentRepository = getCustomRepository(ContentRepository);
    const content = await contentRepository.findById(contentId);

    question = this.create({ ...question, content });

    const alternativeRepository = getCustomRepository(AlternativeRepository);
    const alternatives: Alternative[] = [];

    Promise.all(
      alternativesDescriptions.map(async (alternativeDescription) => {
        const { description, index } = alternativeDescription;
        const alternative = await alternativeRepository.createAlternative({
          description,
          index,
        });
        alternatives.push(alternative);
      })
    );

    question = this.create({ ...question, alternatives });

    return await this.save(question);
  }

  async findAll(): Promise<Question[]> {
    return await this.find({ relations: ['alternatives'] });
  }

  async findByContent(contentId: string): Promise<Question[]> {
    const contentRepository = getCustomRepository(ContentRepository);
    const content = await contentRepository.findById(contentId);

    return await this.find({
      where: { content },
      relations: ['content', 'alternatives'],
    });
  }

  async findById(id: string): Promise<Question> {
    return await this.findOne(
      { id },
      { relations: ['content', 'alternatives'] }
    );
  }

  async updateById(updateFields: IQuestionRequest): Promise<void> {
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
