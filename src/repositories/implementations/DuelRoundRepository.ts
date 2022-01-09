import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IDuelRoundRequest } from '../../dto/IDuelRoundRequest';
import { DuelRound } from '../../entities/DuelRound';
import { Question } from '../../entities/Question';
import { randInt } from '../../functions/utils';
import { IDuelRoundRepository } from '../interfaces/IDuelRoundRepository';
import { ContentRepository } from './ContentRepository';
import { DuelRoundQuestionRepository } from './DuelRoundQuestionRepository';
import { DuelTeamRepository } from './DuelTeamRepository';

@EntityRepository(DuelRound)
export class DuelRoundRepository
  extends Repository<DuelRound>
  implements IDuelRoundRepository
{
  async createDuelRound(
    duelRoundParams: IDuelRoundRequest
  ): Promise<DuelRound> {
    // Desestruturando parametros a serem utilizados na funcao
    let { questionsPerContent, contentsId, maxGroupParticipants } =
      duelRoundParams;

    // Excluindo a variavel que armazena o id dos conteudos da entidade
    delete duelRoundParams.contentsId;

    // Armazenando os novos parametros em outra variavel
    let duelRound = { ...duelRoundParams };

    // Obtendo o repositorio de conteudos
    const contentRepository = await getCustomRepository(ContentRepository);

    // Validando o vetor que contem os ids dos conteudos
    contentsId = contentsId || [];

    // Declarando vetor que armazenara os ids das questoes do round
    let questionsIds: string[] = [];

    // Iterando sobre todos os conteudos informados
    await Promise.all(
      contentsId.map(async (contentId) => {
        // Obtendo o conteudo na posicao da iteracao
        const content = await contentRepository.findById(contentId);

        // Selecionando as questoes faceis do conteudo
        const easyQuestions = content.questions.filter(
          (question) => question.difficulty === 1
        );

        // Selecionando as questoes de dificuldade media
        const mediumQuestions = content.questions.filter(
          (question) => question.difficulty === 2
        );

        // Selecionando as questoes dificeis
        const hardQuestions = content.questions.filter(
          (question) => question.difficulty === 3
        );

        // Sorteando e adicionando as questoes faceis no vetor de questoes
        questionsIds = [
          ...questionsIds,
          ...this.randomDuelRoundQuestionsIds(
            easyQuestions,
            questionsPerContent === 3 ? 1 : Math.ceil(questionsPerContent / 2)
          ),
        ];

        // Sorteando e adicionando as questoes de nivel medio no vetor de questoes
        questionsIds = [
          ...questionsIds,
          ...this.randomDuelRoundQuestionsIds(
            mediumQuestions,
            Math.floor(questionsPerContent / 3)
          ),
        ];

        // Sorteando e adicionando as questoes dificeis no vetor de questoes
        questionsIds = [
          ...questionsIds,
          ...this.randomDuelRoundQuestionsIds(
            hardQuestions,
            Math.ceil(questionsPerContent / 5)
          ),
        ];
      })
    );

    const duelRoundQuestionRepository = await getCustomRepository(
      DuelRoundQuestionRepository
    );
    const questions =
      await duelRoundQuestionRepository.createManyDuelRoundQuestions({
        questionsIds,
      });

    const duelTeamRepository = await getCustomRepository(DuelTeamRepository);
    const teams = await duelTeamRepository.createManyDuelTeams({
      basicDuelTeamsParams: [
        {
          name: 'Equipe A',
          studentsIds: ['', ''],
        },
        {
          name: 'Equipe B',
          studentsIds: ['', ''],
        },
      ],
    });

    duelRound = this.create({
      ...duelRound,
      questions,
      teams,
      lastTeamIndex: -1,
    });

    // Criando o round do duelo
    return await this.save({ ...duelRound });
  }

  /***************************************************************************
   * @author Jose Ricardo Brasileiro Goncalves
   * @modified 08/01/2022
   * @param defaultQuestions Esse parametro recebe as questoes que devem ser
   * sorteadas
   * @param questionsNumber Esse parametro recebe o numero maximo de questoes
   * que devem ser sorteadas
   * @description Essa funcao retorna um array de questoes que eh sorteado com
   * base no vetor informado nos parametros questoes
   ************************************************************************* */
  randomDuelRoundQuestionsIds(
    defaultQuestions: Question[],
    questionsNumber: number
  ): string[] {
    // Variavel que armazena o indice da questao sorteada
    let questionIndex = -1;

    // Vetor que armazena os ids das questoes sorteadas
    const questionsIds: string[] = [];

    /************************************************************************
     * Itera ate o numero de questoes que devem ser sorteadas ou, ate as ques-
     * toes se acabarem caso o tamanho do vetor seja menor que o numero de
     * questoes que devem ser sortedas
     ********************************************************************** */
    for (let i = 0; i < questionsNumber && i < defaultQuestions.length; i++) {
      // Sorteia um numero
      questionIndex = randInt(0, defaultQuestions.length - 1);

      // Procura a questao sorteada no array de questoes sortedas
      const foundQuestion = questionsIds.find(
        (questionId) => questionId === defaultQuestions[questionIndex].id
      );

      // Se a questao sorteada ja existir no vetor de questoes sortedas, a iteracao eh refeita
      if (foundQuestion) {
        // Decrementa a variavel de controle
        i--;

        // Ignora o codigo abaixo do if
        continue;
      }

      // Adiciona o id da questao sorteada no vetor dos ids das questoes sorteadas
      questionsIds.push(defaultQuestions[questionIndex].id);
    }

    // Retorna os ids das questoes sorteadas
    return questionsIds;
  }

  async findAll(): Promise<DuelRound[]> {
    return await this.find({
      relations: ['duelRoundOwner', 'questions', 'teams'],
    });
  }

  async findById(id: string): Promise<DuelRound | undefined> {
    let duelRound = await this.findOne(
      { id },
      { relations: ['duel', 'questions'] }
    );

    const duelTeamRepository = await getCustomRepository(DuelTeamRepository);
    const teams = await duelTeamRepository.findByDuelRound(duelRound);

    duelRound = { ...duelRound, teams };

    return duelRound;
  }

  async updateById(updateFields: IDuelRoundRequest): Promise<void> {
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
