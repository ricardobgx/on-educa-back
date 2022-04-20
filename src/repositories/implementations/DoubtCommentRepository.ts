import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IDoubtCommentRequest } from '../../dto/doubtComment/IDoubtCommentRequest';
import { DoubtComment } from '../../entities/DoubtComment';
import { ApplicationErrors } from '../../errors';
import { IDoubtCommentRepository } from '../interfaces/IDoubtCommentRepository';
import { DoubtRepository } from './DoubtRepository';
import { PeopleRepository } from './PeopleRepository';

@EntityRepository(DoubtComment)
export class DoubtCommentRepository
  extends Repository<DoubtComment>
  implements IDoubtCommentRepository
{
  async createDoubtComment(
    doubtCommentParams: IDoubtCommentRequest
  ): Promise<DoubtComment> {
    const { content, peopleId, doubtId } = doubtCommentParams;

    if (!peopleId || !doubtId) {
      throw new ApplicationErrors('Missing data', 400);
    }

    const peopleRepository = await getCustomRepository(PeopleRepository);
    const people = await peopleRepository.findById(peopleId);

    if (!people) {
      throw new ApplicationErrors('People not found', 400);
    }

    const doubtRepository = await getCustomRepository(DoubtRepository);
    const doubt = await doubtRepository.findById(doubtId);

    if (!doubt) {
      throw new ApplicationErrors('Doubt not found', 400);
    }

    const doubtComment = this.create({
      content,
      people,
      doubt,
      createdAt: new Date(),
    });

    // Salva a pratica na base de dados e retorna
    return await this.save(doubtComment);
  }

  async findAll(): Promise<DoubtComment[]> {
    const doubtCommentsFound = await this.find({
      relations: ['people', 'doubt'],
    });

    const doubtComments: DoubtComment[] = [];

    await Promise.all(
      doubtCommentsFound.map(async (doubtCommentFound) => {
        const doubtComment = await this.findById(doubtCommentFound.id);

        doubtComments.push(doubtComment);
      })
    );

    return doubtComments;
  }

  async findByDoubt(doubtId: string): Promise<DoubtComment[]> {
    const doubtRepository = await getCustomRepository(DoubtRepository);

    const doubt = await doubtRepository.findById(doubtId);

    const doubtCommentsFound = await this.find({
      where: {
        doubt,
      },
      relations: ['people', 'doubt'],
    });

    const doubtComments: DoubtComment[] = [];

    await Promise.all(
      doubtCommentsFound.map(async (doubtCommentFound) => {
        const doubtComment = await this.findById(doubtCommentFound.id);

        doubtComments.push(doubtComment);
      })
    );

    return doubtComments;
  }

  async findById(id: string): Promise<DoubtComment | undefined> {
    const doubtComment = await this.findOne(
      { id },
      { relations: ['people', 'doubt'] }
    );

    const peopleRepository = await getCustomRepository(PeopleRepository);

    const people = await peopleRepository.findById(doubtComment.people.id);

    return { ...doubtComment, people };
  }

  async updateById(updateFields: IDoubtCommentRequest): Promise<void> {
    const { id } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      (key: string) => fields[key] === undefined && delete fields[key]
    );

    await this.update({ id }, fields);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return await this.delete({ id });
  }
}
