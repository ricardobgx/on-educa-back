import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IDuelRoundRequest } from '../../dto/IDuelRoundRequest';
import { DuelRound } from '../../entities/DuelRound';
import { DuelTeam } from '../../entities/DuelTeam';
import { DuelTeamParticipation } from '../../entities/DuelTeamParticipation';
import { Question } from '../../entities/Question';
import { randomQuestionsIds, sortDuelTeams } from '../../functions/duelRound';
import { findValidDuelTeamParticipation } from '../../functions/duelTeamParticipation';
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
      questions,
      team,
      teams,
      status: 0,
    });

    // Criando o round do duelo
    return await this.save({ ...duelRound });
  }

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
    let duelRound = await this.findOne(
      { id },
      { relations: ['duel', 'question', 'questions', 'team', 'teams'] }
    );

    if (duelRound) {
      const {
        teams: teamsFound,
        question: questionFound,
        team: teamFound,
      } = duelRound;
      const teams: DuelTeam[] = [];

      const duelTeamRepository = await getCustomRepository(DuelTeamRepository);
      await Promise.all(
        teamsFound.map(async (teamFound) => {
          const team = await duelTeamRepository.findById(teamFound.id);
          teams.push(team);
        })
      );

      duelRound = this.create({ ...duelRound, teams });

      if (questionFound) {
        const duelRoundQuestionRepository = await getCustomRepository(
          DuelRoundQuestionRepository
        );
        const question = await duelRoundQuestionRepository.findById(
          questionFound.id
        );

        duelRound = this.create({ ...duelRound, question });
      }

      if (teamFound) {
        const duelTeamRepository = await getCustomRepository(
          DuelTeamRepository
        );
        const team = await duelTeamRepository.findById(teamFound.id);

        duelRound = this.create({ ...duelRound, team });
      }
    }

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

  async startDuelRound(duelRoundId: string): Promise<void> {
    const duelRound = await this.findById(duelRoundId);

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
          await this.updateById({ id: duelRound.id, status: 2 });
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
}
