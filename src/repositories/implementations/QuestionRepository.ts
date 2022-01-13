import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IQuestionRequest } from '../../dto/IQuestionRequest';
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
    const { contentId } = questionParams;

    delete questionParams.contentId;

    let question = { ...questionParams };

    const contentRepository = getCustomRepository(ContentRepository);
    const content = await contentRepository.findById(contentId);

    question = this.create({
      ...question,
      content,
    });

    return await this.save(question);
  }

  async findAll(): Promise<Question[]> {
    return await this.find({ relations: ['alternatives', 'content'] });
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
      { relations: ['content', 'alternatives', 'rightAlternative'] }
    );
  }

  async updateById(updateFields: IQuestionRequest): Promise<void> {
    const { id } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      (key) => fields[key] === undefined && delete fields[key]
    );

    let question = { ...fields };

    if (question.contentId) {
      const { contentId } = question;

      delete question.contentId;

      const contentRepository = getCustomRepository(ContentRepository);
      const content = await contentRepository.findById(contentId);

      if (content) {
        question = this.create({ ...question, content });
      }
    }

    if (question.rightAlternativeId) {
      const { rightAlternativeId } = question;

      delete question.rightAlternativeId;

      const alternativeRepository = getCustomRepository(AlternativeRepository);
      const rightAlternative = await alternativeRepository.findById(
        rightAlternativeId
      );

      if (rightAlternative) {
        question = this.create({ ...question, rightAlternative });
      }
    }

    await this.update({ id }, question);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return await this.delete({ id });
  }
}
