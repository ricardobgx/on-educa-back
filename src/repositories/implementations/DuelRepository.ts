import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IDuelRequest } from '../../dto/IDuelRequest';
import { Duel } from '../../entities/Duel';
import { Question } from '../../entities/Question';
import { ApplicationErrors } from '../../errors';
import { IDuelRepository } from '../interfaces/IDuelRepository';
import { ContentRepository } from './ContentRepository';
import { StudentRepository } from './StudentRepository';

@EntityRepository(Duel)
export class DuelRepository
  extends Repository<Duel>
  implements IDuelRepository
{
  async createDuel(duelParams: IDuelRequest): Promise<Duel> {
    let { duelOwnerId, contentsId } = duelParams;

    if (!duelOwnerId)
      throw new ApplicationErrors('Estudante não encontrado', 404);

    delete duelParams.contentsId;
    delete duelParams.duelOwnerId;

    let newDuelParams = { ...duelParams };

    const studentRepository = getCustomRepository(StudentRepository);
    const duelOwner = await studentRepository.findById(duelOwnerId || '');

    if (!duelOwner)
      throw new ApplicationErrors('Estudante não encontrado', 404);

    const contentRepository = getCustomRepository(ContentRepository);

    contentsId = contentsId || [];

    let questions: Question[] = [];
    let questionsPerContent = duelParams.questionsPerContent || 0;

    Promise.all(
      contentsId.map(async (contentId) => {
        const content = await contentRepository.findById(contentId);

        const easyQuestions = content.questions.filter(
          (question) => question.difficulty === 1
        );
        const mediumQuestions = content.questions.filter(
          (question) => question.difficulty === 2
        );
        const hardQuestions = content.questions.filter(
          (question) => question.difficulty === 3
        );

        questions = [
          ...questions,
          ...this.randomDuelQuestions(easyQuestions, questionsPerContent / 2),
        ];
        questions = [
          ...questions,
          ...this.randomDuelQuestions(
            mediumQuestions,
            Math.floor(questionsPerContent / 3)
          ),
        ];
        questions = [
          ...questions,
          ...this.randomDuelQuestions(hardQuestions, questionsPerContent / 5),
        ];
      })
    );

    const duel = await this.save({ ...newDuelParams });

    return duel;
  }

  randomDuelQuestions(
    defaultQuestions: Question[],
    questionsNumber: number
  ): Question[] {
    let questionIndex = -1;
    const questions: Question[] = [];

    for (let i = 0; i < questionsNumber && i < defaultQuestions.length; i++) {
      questionIndex = Math.random();

      questions.push(defaultQuestions[questionIndex]);
    }

    return questions;
  }

  async findAll(): Promise<Duel[]> {
    return await this.find({
      relations: ['duelOwner', 'questions', 'teams'],
    });
  }

  async findById(id: string): Promise<Duel | undefined> {
    return await this.findOne(
      { id },
      { relations: ['duelOwner', 'questions', 'teams'] }
    );
  }

  async updateById(updateFields: IDuelRequest): Promise<void> {
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
