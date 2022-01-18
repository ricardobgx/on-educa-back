import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IPracticeQuestionRequest } from '../../dto/IPracticeQuestionRequest';
import { PracticeQuestion } from '../../entities/PracticeQuestion';
import { ApplicationErrors } from '../../errors';
import { IPracticeQuestionRepository } from '../interfaces/IPracticeQuestionRepository';
import { PracticeQuestionAnswerRepository } from './PracticeQuestionAnswerRepository';
import { QuestionRepository } from './QuestionRepository';

@EntityRepository(PracticeQuestion)
export class PracticeQuestionRepository
  extends Repository<PracticeQuestion>
  implements IPracticeQuestionRepository
{
  async createPracticeQuestion(
    practiceQuestionParams: IPracticeQuestionRequest
  ): Promise<PracticeQuestion> {
    // Desestruturando campos necessarios para a criacao
    const { questionId } = practiceQuestionParams;

    // Excluindo campos nao necessarios
    delete practiceQuestionParams.practiceId;
    delete practiceQuestionParams.questionId;
    delete practiceQuestionParams.answerId;

    // Criando variavel para armazenar os dados da questao da pratica
    let practiceQuestion = { ...practiceQuestionParams };

    // Procurando a questao
    const questionRepository = await getCustomRepository(QuestionRepository);
    const question = await questionRepository.findById(questionId);

    // Verifica se a questao foi encontrada, caso nao seja retorna um erro
    if (!question) {
      throw new ApplicationErrors('Questao nao encontrada', 404);
    }

    // Adicionando a questao encontrada a variavel de criacao
    practiceQuestion = this.create({ ...practiceQuestion, question });

    // Salva a pratica na base de dados e retorna
    return await this.save({ ...practiceQuestion });
  }

  async findAll(): Promise<PracticeQuestion[]> {
    return await this.find({
      relations: ['practice', 'question', 'answer'],
    });
  }

  async findById(id: string): Promise<PracticeQuestion | undefined> {
    let practiceQuestion = await this.findOne(
      { id },
      { relations: ['practice', 'question', 'answer'] }
    );

    if (practiceQuestion) {
      const { question: questionFound, answer: answerFound } = practiceQuestion;

      if (questionFound) {
        const questionRepository = await getCustomRepository(
          QuestionRepository
        );
        const question = await questionRepository.findById(questionFound.id);

        if (question) {
          practiceQuestion = { ...practiceQuestion, question };
        }
      }

      if (answerFound) {
        const practiceQuestionAnswerRepository = await getCustomRepository(
          PracticeQuestionAnswerRepository
        );
        const answer = await practiceQuestionAnswerRepository.findById(
          answerFound.id
        );

        if (answer) {
          practiceQuestion = { ...practiceQuestion, answer };
        }
      }
    }

    return practiceQuestion;
  }

  async updateById(updateFields: IPracticeQuestionRequest): Promise<void> {
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
