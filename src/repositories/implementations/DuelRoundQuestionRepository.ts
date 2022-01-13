import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IDuelRoundQuestionRequest } from '../../dto/IDuelRoundQuestionRequest';
import { IManyDuelRoundQuestionsRequest } from '../../dto/IManyDuelRoundQuestionsRequest';
import { DuelRoundQuestion } from '../../entities/DuelRoundQuestion';
import { ApplicationErrors } from '../../errors';
import { IDuelRoundQuestionRepository } from '../interfaces/IDuelRoundQuestionRepository';
import { QuestionRepository } from './QuestionRepository';

@EntityRepository(DuelRoundQuestion)
export class DuelRoundQuestionRepository
  extends Repository<DuelRoundQuestion>
  implements IDuelRoundQuestionRepository
{
  async createDuelRoundQuestion(
    duelRoundQuestionParams: IDuelRoundQuestionRequest
  ): Promise<DuelRoundQuestion> {
    // Desestruturando parametros a serem utilizados na funcao
    let { questionId } = duelRoundQuestionParams;

    // Excluindo a variavel que armazena o id dos conteudos da entidade
    delete duelRoundQuestionParams.questionId;

    // Armazenando os novos parametros em outra variavel
    let duelRoundQuestion = { ...duelRoundQuestionParams };

    // Obtendo o repositorio de questoes
    const questionRepository = await getCustomRepository(QuestionRepository);
    // Procurando a questao pelo id informado
    const question = await questionRepository.findById(questionId);

    // Verificao se a questao existe, caso nao exista, informa um erro
    if (!question) {
      throw new ApplicationErrors('A questão não existe', 404);
    }

    // Atribuindo a questao a questao do round de duelo
    duelRoundQuestion = this.create({ ...duelRoundQuestion, question });

    // Criando a questao do round do duelo
    return await this.save({ ...duelRoundQuestion });
  }

  async createManyDuelRoundQuestions(
    duelRoundQuestionsParams: IManyDuelRoundQuestionsRequest
  ): Promise<DuelRoundQuestion[]> {
    const { questionsIds } = duelRoundQuestionsParams;

    const duelRoundQuestions: DuelRoundQuestion[] = [];

    await Promise.all(
      questionsIds.map(async (questionId) => {
        const duelRoundQuestion = await this.createDuelRoundQuestion({
          questionId,
        });
        duelRoundQuestions.push(duelRoundQuestion);
      })
    );

    return duelRoundQuestions;
  }

  async findAll(): Promise<DuelRoundQuestion[]> {
    return await this.find({
      relations: ['duelRoundQuestionOwner', 'questions', 'teams'],
    });
  }

  async findById(id: string): Promise<DuelRoundQuestion | undefined> {
    return await this.findOne(
      { id },
      { relations: ['duelRoundQuestionOwner', 'questions', 'teams'] }
    );
  }

  async updateById(updateFields: IDuelRoundQuestionRequest): Promise<void> {
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