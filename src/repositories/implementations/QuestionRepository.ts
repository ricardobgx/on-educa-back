import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { ICorrectPracticeQuestionsRequest } from '../../dto/ICorrectPracticeQuestionsRequest';
import { IQuestionRequest } from '../../dto/IQuestionRequest';
import { Question } from '../../entities/Question';
import { randInt } from '../../functions/utils';
import { IQuestionRepository } from '../interfaces/IQuestionRepository';
import { AlternativeRepository } from './AlternativeRepository';
import { ContentRepository } from './ContentRepository';
import { StudentRepository } from './StudentRepository';

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
    return await this.find({
      relations: ['alternatives', 'content', 'rightAlternative'],
    });
  }

  async findByContent(contentId: string): Promise<Question[]> {
    const contentRepository = getCustomRepository(ContentRepository);
    const content = await contentRepository.findById(contentId);

    return await this.find({
      where: { content },
      relations: ['content', 'alternatives', 'rightAlternative'],
    });
  }

  async findById(id: string): Promise<Question> {
    return await this.findOne(
      { id },
      { relations: ['content', 'alternatives', 'rightAlternative'] }
    );
  }

  getQuestionsByDifficulty(
    questions: Question[],
    difficulty: number
  ): Question[] {
    return questions.map((question) => {
      if (question.difficulty === difficulty) {
        return question;
      }
    });
  }

  async getPracticeQuestions(contentId: string): Promise<Question[]> {
    const questionsByContent: Question[] = await this.findByContent(contentId);

    if (questionsByContent.length <= 10) {
      return questionsByContent;
    }

    let questions: Question[] = [];

    const easyQuestions: Question[] = this.getQuestionsByDifficulty(
      questionsByContent,
      1
    );

    const mediumQuestions: Question[] = this.getQuestionsByDifficulty(
      questionsByContent,
      2
    );

    const hardQuestions: Question[] = this.getQuestionsByDifficulty(
      questionsByContent,
      3
    );

    questions = [...questions, ...this.randomQuestions(easyQuestions, 5)];
    questions = [...questions, ...this.randomQuestions(mediumQuestions, 3)];
    questions = [...questions, ...this.randomQuestions(hardQuestions, 2)];

    return questions;
  }

  async correctPracticeQuestions(
    correctPracticeQuestionsParams: ICorrectPracticeQuestionsRequest
  ): Promise<void> {
    const { studentId, answeredQuestions } = correctPracticeQuestionsParams;

    let totalXP = 0;

    await Promise.all(
      answeredQuestions.map(async (answeredQuestion) => {
        const { questionId, selectedAlternativeId } = answeredQuestion;

        const question = await this.findById(questionId);
        if (question) {
          const { difficulty, rightAlternative } = question;
          if (rightAlternative.id === selectedAlternativeId) {
            totalXP += difficulty * 5;
          }
        }
        return question;
      })
    );
  }

  randomQuestions(
    questionsDefault: Question[],
    numQuestions: number
  ): Question[] {
    const questions: Question[] = [];

    for (let i = 0; i < numQuestions; i++) {
      const questionIndex = randInt(0, questionsDefault.length - 1);
      const questionRand = questionsDefault[questionIndex];

      const questionExisting = questions.find(
        (question) => question.id === questionRand.id
      );

      if (questionExisting) {
        i--;
        continue;
      }

      questions.push(questionRand);
    }

    return questions;
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
