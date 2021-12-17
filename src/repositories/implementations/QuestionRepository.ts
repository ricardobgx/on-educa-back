import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
  ILike,
} from 'typeorm';
import { IQuestionRequest } from '../../dto/IQuestionRequest';
import { Question } from '../../entities/Question';
import { IQuestionRepository } from '../interfaces/IQuestionRepository';
import { ContentRepository } from './ContentRepository';

@EntityRepository(Question)
export class QuestionRepository
  extends Repository<Question>
  implements IQuestionRepository
{
  async createQuestion(questionParams: IQuestionRequest): Promise<Question> {
    const { description, difficulty, contentId } = questionParams;

    const contentRepository = getCustomRepository(ContentRepository);
    const content = await contentRepository.findById(contentId);

    const newQuestionParams = this.create({
      description,
      difficulty,
      content,
    });

    const question = await this.save(newQuestionParams);

    return question;
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
