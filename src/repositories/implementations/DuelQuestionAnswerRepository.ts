import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IDuelQuestionAnswerRequest } from '../../dto/IDuelQuestionAnswerRequest';
// import { IManyDuelQuestionAnswersRequest } from '../../dto/IManyDuelQuestionAnswersRequest';
import { DuelQuestionAnswer } from '../../entities/DuelQuestionAnswer';
import { ApplicationErrors } from '../../errors';
import { IDuelQuestionAnswerRepository } from '../interfaces/IDuelQuestionAnswerRepository';
import { AlternativeRepository } from './AlternativeRepository';
import { DuelRoundQuestionRepository } from './DuelRoundQuestionRepository';
import { DuelTeamParticipationRepository } from './DuelTeamParticipationRepository';

@EntityRepository(DuelQuestionAnswer)
export class DuelQuestionAnswerRepository
  extends Repository<DuelQuestionAnswer>
  implements IDuelQuestionAnswerRepository
{
  async createDuelQuestionAnswer(
    duelQuestionAnswerParams: IDuelQuestionAnswerRequest
  ): Promise<DuelQuestionAnswer> {
    // Desestruturando parametros a serem utilizados na funcao
    let { duelTeamParticipationId, questionId, selectedAlternativeId } =
      duelQuestionAnswerParams;

    // Excluindo a variavel que armazena o id dos conteudos da entidade
    delete duelQuestionAnswerParams.duelTeamParticipationId;
    delete duelQuestionAnswerParams.questionId;
    delete duelQuestionAnswerParams.selectedAlternativeId;

    // Armazenando os novos parametros em outra variavel
    let duelQuestionAnswer = { ...duelQuestionAnswerParams };

    if (questionId) {
      // Obtendo o repositorio de questoes de duelo
      const duelRoundQuestionRepository = await getCustomRepository(
        DuelRoundQuestionRepository
      );
      // Procurando a questao pelo id informado
      const question = await duelRoundQuestionRepository.findById(questionId);

      // Verificao se a questao existe, caso nao exista, informa um erro
      if (!question) {
        throw new ApplicationErrors('A questão não existe', 404);
      }

      // Atribuindo a questao a resposta da questao do round de duelo
      duelQuestionAnswer = this.create({ ...duelQuestionAnswer, question });
    }

    if (duelTeamParticipationId) {
      const duelTeamParticipationRepository = await getCustomRepository(
        DuelTeamParticipationRepository
      );

      const duelTeamParticipation =
        await duelTeamParticipationRepository.findById(duelTeamParticipationId);

      // Verificao se a participacao existe, caso nao exista, informa um erro
      if (!duelTeamParticipation) {
        throw new ApplicationErrors('A participação não existe', 404);
      }

      // Atribuindo a participacao a questao do round de duelo
      duelQuestionAnswer = this.create({
        ...duelQuestionAnswer,
        duelTeamParticipation,
      });
    }

    if (selectedAlternativeId) {
      const alternativeRepository = await getCustomRepository(
        AlternativeRepository
      );

      const selectedAlternative = await alternativeRepository.findById(
        selectedAlternativeId
      );

      // Verificao se a alternativa existe, caso nao exista, informa um erro
      if (!selectedAlternative) {
        throw new ApplicationErrors('A alternativa não existe', 404);
      }

      // Atribuindo a alternative a questao do round de duelo
      duelQuestionAnswer = this.create({
        ...duelQuestionAnswer,
        selectedAlternative,
      });
    }

    // Criando a questao do round do duelo
    return await this.save({ ...duelQuestionAnswer });
  }

  /*
  async createManyDuelQuestionAnswers(
    duelQuestionAnswersParams: IManyDuelQuestionAnswersRequest
  ): Promise<DuelQuestionAnswer[]> {
    const { questionsIds } = duelQuestionAnswersParams;

    const duelQuestionAnswers: DuelQuestionAnswer[] = [];

    await Promise.all(
      questionsIds.map(async (questionId) => {
        const duelQuestionAnswer = await this.createDuelQuestionAnswer({
          questionId,
        });
        duelQuestionAnswers.push(duelQuestionAnswer);
      })
    );

    return duelQuestionAnswers;
  }
  */

  async findAll(): Promise<DuelQuestionAnswer[]> {
    return await this.find({
      relations: ['duelQuestionAnswerOwner', 'questions', 'teams'],
    });
  }

  async findById(id: string): Promise<DuelQuestionAnswer | undefined> {
    const duelQuestionAnswer = await this.findOne({
      where: {
        id,
      },
      relations: ['question'],
    });

    const { question: foundQuestion } = duelQuestionAnswer;

    const questionRepository = await getCustomRepository(
      DuelRoundQuestionRepository
    );

    const question = await questionRepository.findById(foundQuestion.id);

    return { ...duelQuestionAnswer, question };
  }

  async updateById(updateFields: IDuelQuestionAnswerRequest): Promise<void> {
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
