import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IDuelRoundRequest } from '../../dto/duelRound/IDuelRoundRequest';
import { IAnswerDuelRoundQuestionRequest } from '../../dto/duelRoundQuestion/IAnswerDuelRoundQuestionRequest';
import { DuelRound } from '../../entities/DuelRound';
import { DuelRoundQuestion } from '../../entities/DuelRoundQuestion';
import { DuelTeam } from '../../entities/DuelTeam';
import { DuelTeamParticipation } from '../../entities/DuelTeamParticipation';
import { ApplicationErrors } from '../../errors';
import { randomQuestionsIds, sortDuelTeams } from '../../functions/duelRound';
import { findValidDuelTeamParticipation } from '../../functions/duelTeamParticipation';
import { randInt } from '../../functions/utils';
import { DuelRoundStatus } from '../../types/DuelRoundStatus';
import { IDuelRoundRepository } from '../interfaces/IDuelRoundRepository';
import { AlternativeRepository } from './AlternativeRepository';
import { ContentRepository } from './ContentRepository';
import { DuelQuestionAnswerRepository } from './DuelQuestionAnswerRepository';
import { DuelRoundQuestionRepository } from './DuelRoundQuestionRepository';
import { DuelTeamParticipationRepository } from './DuelTeamParticipationRepository';
import { DuelTeamRepository } from './DuelTeamRepository';
import { StudentWeeklyPerformanceRepository } from './StudentWeeklyPerformanceRepository';

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

        // Sorteando e adicionando as questoes no vetor de ids de questoes
        questionsIds = [
          ...questionsIds,
          ...randomQuestionsIds(content.questions, questionsPerContent),
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

    const studentsIds = this.generateDefaultStudentsIds(maxGroupParticipants);

    const duelTeamRepository = await getCustomRepository(DuelTeamRepository);
    const teams = await duelTeamRepository.createManyDuelTeams({
      basicDuelTeamsParams: [
        {
          name: 'Equipe A',
          studentsIds,
        },
        {
          name: 'Equipe B',
          studentsIds,
        },
      ],
    });

    const sortedTeams = sortDuelTeams(teams);
    const team = sortedTeams[0];

    duelRound = this.create({
      ...duelRound,
      question: questions[0],
      questions,
      team,
      teams,
      status: 0,
    });

    // Criando o round do duelo
    return await this.save({ ...duelRound });
  }

  /****************************************************************
   * @author Jose Ricardo Brasileiro Goncalves
   * @brief Gera array de strings vazias para criar os times
   * @param maxGroupParticipants Numero maximo de pessoas por time
   ************************************************************** */
  generateDefaultStudentsIds(maxGroupParticipants: number): string[] {
    const studentsIds: string[] = [];

    for (let i = 0; i < maxGroupParticipants; i += 1) {
      studentsIds.push('');
    }

    return studentsIds;
  }

  async findAll(): Promise<DuelRound[]> {
    return await this.find({
      relations: ['duelRoundOwner', 'questions', 'teams'],
    });
  }

  async findById(id: string): Promise<DuelRound | undefined> {
    console.log('pegando round');

    let duelRound = await this.findOne(
      { id },
      {
        relations: [
          'duel',
          'question',
          'questions',
          'team',
          'teams',
          'winnerTeam',
        ],
      }
    );

    // Verifica se o round existe
    if (!duelRound) {
      return duelRound;
    }

    const {
      team: teamFound,
      teams: teamsFound,
      question: questionFound,
      winnerTeam: winnerTeamFound,
    } = duelRound;

    // Armazena os times do round
    const teams: DuelTeam[] = [];

    // Repositorio de times
    const duelTeamRepository = await getCustomRepository(DuelTeamRepository);

    // Pega os times do round
    await Promise.all(
      teamsFound.map(async (teamFound) => {
        const team = await duelTeamRepository.findById(teamFound.id);
        teams.push(team);
      })
    );

    // Verifica se o round tem uma questao selecionada
    if (!questionFound) {
      throw new ApplicationErrors('Questao nao existe', 404);
    }

    // Repositorio de questoes de round
    const duelRoundQuestionRepository = await getCustomRepository(
      DuelRoundQuestionRepository
    );

    // Pegando questao selecionada
    const question = await duelRoundQuestionRepository.findById(
      questionFound.id
    );

    // Verifica se o round tem um time selecionado
    if (!teamFound) {
      throw new ApplicationErrors('Time nao existe', 404);
    }

    const team = await duelTeamRepository.findById(teamFound.id);

    if (winnerTeamFound) {
      const winnerTeam = await duelTeamRepository.findById(winnerTeamFound.id);
      duelRound = this.create({
        ...duelRound,
        teams,
        team,
        winnerTeam,
        question,
      });

      return duelRound;
    }

    duelRound = this.create({
      ...duelRound,
      teams,
      team,
      question,
    });

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

  /*******************************************************
   * @author Jose Ricardo Brasileiro Goncalves
   * @brief Inicia o round do duelo
   * @param duelRoundId Id do round que deve ser iniciado
   ***************************************************** */
  async startDuelRound(duelRoundId: string): Promise<void> {
    const duelRound = await this.findById(duelRoundId);

    // Verifica se o round foi encontrado
    if (duelRound) {
      const {
        team: activeTeam,
        teams,
        question: activeQuestion,
        questions,
      } = duelRound;

      // Verifica se tem um time ativo
      if (activeTeam) {
        const { participation: activeParticipation } = activeTeam;

        // Verifica se a participacao ativa nao eh valida
        // if (!activeParticipation.student) {
        let newActiveParticipation: DuelTeamParticipation;
        let newActiveTeam: DuelTeam;

        // Procura por uma nova participacao valida no time
        newActiveParticipation = findValidDuelTeamParticipation(
          activeTeam.participations
        );

        // Verifica se achou uma participacao valida
        if (newActiveParticipation) {
          newActiveTeam = activeTeam;
        } else {
          teams.map((team) => {
            // Verifica se o time nao eh o antigo e se ainda nao achou uma participacao
            if (team.id !== activeTeam.id && !newActiveParticipation) {
              // Procura por uma participacao valida no time iterado
              newActiveParticipation = findValidDuelTeamParticipation(
                team.participations
              );
              // Se achar uma participacao define o time como ativo
              if (newActiveParticipation) {
                newActiveTeam = team;
              }
            }
            return team;
          });
        }

        // Se ainda nao tiver achado uma participacao o round eh dado como finalizado
        if (!newActiveParticipation) {
          await this.updateById({
            id: duelRound.id,
            status: DuelRoundStatus.STARTED,
          });
          return;
        } else {
          // Caso encontre sera atualizada a participacao no time

          // Obtendo repositorio de times
          const duelTeamRepository = await getCustomRepository(
            DuelTeamRepository
          );

          // Atualizando a participacao valida no time
          await duelTeamRepository.updateById({
            id: activeTeam.id,
            participationId: activeParticipation.id,
          });

          // Atualizando o time ativo no round
          await this.update({ id: duelRound.id }, { team: newActiveTeam });
        }
        // }
      }

      // Verifica se existe uma questao ativa
      if (!activeQuestion) {
        // Verifica se possuem questoes para serem sorteadas
        if (questions.length > 0) {
          const questionIndex = randInt(0, questions.length);
          const question = questions[questionIndex];

          await this.update({ id: duelRound.id }, { question });
        } else {
          await this.updateById({ id: duelRound.id, status: 2 });
        }
      }

      await this.updateById({ id: duelRound.id, status: 1 });
    }
  }

  async finishDuelRound(duelRound: DuelRound): Promise<void> {
    const { teams: unsortedTeams } = duelRound;

    let teamAScore = 0;
    let teamBScore = 0;

    // Ordena os times
    const teams = sortDuelTeams(unsortedTeams);

    const duelQuestionAnswerRepository = await getCustomRepository(
      DuelQuestionAnswerRepository
    );

    const studentWeeklyPerformanceRepository = await getCustomRepository(
      StudentWeeklyPerformanceRepository
    );

    // Percorre cada time
    await Promise.all(
      teams.map(async (team, teamIndex) => {
        // Percorre as participacoes de cada time
        await Promise.all(
          team.participations.map(async (participation) => {
            if (!participation.student) {
              return participation;
            }

            let participationXP = 0;

            // Pega as respostas da participacao
            const { duelQuestionsAnswers } = participation;

            // Percorre por cada resposta
            await Promise.all(
              duelQuestionsAnswers.map(async (duelQuestionAnswer) => {
                const duelQuestionAnswerFound =
                  await duelQuestionAnswerRepository.findById(
                    duelQuestionAnswer.id
                  );

                // Pega a questao do duelo e a alternativa selecionada
                const { question: duelRoundQuestion, selectedAlternative } =
                  duelQuestionAnswerFound;

                // Pega a questao normal
                const { question } = duelRoundQuestion;

                // Pega a alternativa correta
                const { rightAlternative } = question;

                // Verifica se a alternativa selecionada eh a correta
                if (selectedAlternative.id === rightAlternative.id) {
                  participationXP += 10;
                  if (team.index === 0) {
                    teamAScore += 10;
                  } else {
                    teamBScore += 10;
                  }
                }
              })
            );

            await studentWeeklyPerformanceRepository.updateStudentWeeklyPerformanceValues(
              {
                studentId: participation.student.id,
                dailyXPNumber: participationXP,
                duelsParticipatedNumber: 1,
              }
            );
          })
        );
      })
    );

    // Verifica o time com maior pontuacao
    const winnerTeam =
      teamAScore > teamBScore
        ? teams[0]
        : teamBScore > teamAScore
        ? teams[1]
        : null;

    if (winnerTeam) {
      await Promise.all(
        winnerTeam.participations.map(async (participation) => {
          if (!participation.student) {
            return;
          }

          await studentWeeklyPerformanceRepository.updateStudentWeeklyPerformanceValues(
            { studentId: participation.student.id, duelsWonNumber: 1 }
          );
        })
      );
    }

    if (winnerTeam) {
      await this.update(
        { id: duelRound.id },
        {
          winnerTeam,
          status: DuelRoundStatus.FINISHED,
        }
      );
      return;
    }

    await this.updateById({
      id: duelRound.id,
      status: DuelRoundStatus.FINISHED,
    });
  }

  async answerDuelRoundQuestion(
    answerDuelRoundQuestionParams: IAnswerDuelRoundQuestionRequest
  ): Promise<void> {
    const {
      duelRoundId,
      duelTeamParticipationId,
      duelRoundQuestionId,
      selectedAlternativeId,
    } = answerDuelRoundQuestionParams;

    // Procura round
    let duelRound = await this.findById(duelRoundId);

    if (!duelRound) {
      throw new ApplicationErrors('Round não encontrado', 404);
    }

    // Criando resposta
    const duelQuestionAnswerRepository = await getCustomRepository(
      DuelQuestionAnswerRepository
    );
    const duelQuestionAnswer =
      await duelQuestionAnswerRepository.createDuelQuestionAnswer({
        questionId: duelRoundQuestionId,
        duelTeamParticipationId,
        selectedAlternativeId,
      });

    duelRound = await this.findById(duelRoundId);

    const nextQuestionIsSetted = await this.setUpNextQuestion(duelRound);

    if (!nextQuestionIsSetted) {
      await this.finishDuelRound(duelRound);
      return;
    }

    const nextParticipationIsSetted = await this.setUpNextParticipation(
      duelRound
    );

    if (!nextParticipationIsSetted) {
      await this.finishDuelRound(duelRound);
      return;
    }
  }

  /*****************************************************************
   * @author Jose Ricardo Brasileiro Goncalves
   * @param duelRound Round que deve ter a proxima questao definida
   * @returns true em caso de conseguir definir a proxima questao e
   * false em caso contrario
   *************************************************************** */
  async setUpNextQuestion(duelRound: DuelRound): Promise<boolean> {
    const { questions: questionsOld } = duelRound;

    const questions: DuelRoundQuestion[] = [];

    const duelRoundQuestionRepository = await getCustomRepository(
      DuelRoundQuestionRepository
    );

    await Promise.all(
      questionsOld.map(async (questionOld) => {
        const question = await duelRoundQuestionRepository.findById(
          questionOld.id
        );
        questions.push(question);
      })
    );

    // Procurando questoes nao respondidas
    const noAnsweredQuestions = questions.filter(
      (question) => !question.answer
    );

    // Verifica se tem questoes para responder
    if (noAnsweredQuestions.length === 0) {
      return false;
    }

    // Randomiza a proxima questao
    const nextQuestionIndex = randInt(0, noAnsweredQuestions.length - 1);

    // Define a questao atual
    await this.update(
      { id: duelRound.id },
      { question: noAnsweredQuestions[nextQuestionIndex] }
    );

    return true;
  }

  async setUpNextParticipation(duelRound: DuelRound): Promise<boolean> {
    const { teams, team, maxGroupParticipants } = duelRound;

    // Procurando proximo time
    const teamNow = team.id === teams[0].id ? teams[1] : teams[0];

    const {
      participation: participationOld,
      participations: unsortedParticipations,
    } = teamNow;

    const participations = unsortedParticipations.sort(
      (
        participationA: DuelTeamParticipation,
        participationB: DuelTeamParticipation
      ) => {
        if (participationA.index > participationB.index) {
          return 1;
        }
        if (participationA.index < participationB.index) {
          return -1;
        }
        return 0;
      }
    );

    let oldParticipationIndex = participationOld.index;
    let participationIndex = -1;

    // Procurando proxima participacao
    for (let i = 0; i < maxGroupParticipants; i++) {
      if (oldParticipationIndex === i) {
        participationIndex = i === maxGroupParticipants - 1 ? 0 : i + 1;

        if (!participations[participationIndex].student) {
          oldParticipationIndex = participationIndex;
          participationIndex = -1;

          if (i === maxGroupParticipants - 1) {
            i = -1;
          }
        }
      }
    }

    // Em caso de nao encontrar a proxima participacao, retorna false
    if (participationIndex === -1) {
      return false;
    }

    // Proxima participacao
    const participationNow = participations[participationIndex];

    // Atualizando time atual
    await this.update({ id: duelRound.id }, { team: teamNow });

    const duelTeamRepository = await getCustomRepository(DuelTeamRepository);

    // Atualizando participacao atual
    await duelTeamRepository.updateById({
      id: teamNow.id,
      participationId: participationNow.id,
    });

    return true;
  }
}
