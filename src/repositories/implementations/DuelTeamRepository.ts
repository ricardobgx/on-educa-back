import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IDuelTeamRequest } from '../../dto/IDuelTeamRequest';
import { IManyDuelTeamsRequest } from '../../dto/IManyDuelTeamsRequest';
import { DuelRound } from '../../entities/DuelRound';
import { DuelTeam } from '../../entities/DuelTeam';
import { DuelTeamParticipation } from '../../entities/DuelTeamParticipation';
import { sortDuelTeamParticipations } from '../../functions/duelTeamParticipation';
import { IDuelTeamRepository } from '../interfaces/IDuelTeamRepository';
import { DuelRepository } from './DuelRepository';
import { DuelRoundRepository } from './DuelRoundRepository';
import { DuelTeamParticipationRepository } from './DuelTeamParticipationRepository';

@EntityRepository(DuelTeam)
export class DuelTeamRepository
  extends Repository<DuelTeam>
  implements IDuelTeamRepository
{
  async createDuelTeam(duelTeamParams: IDuelTeamRequest): Promise<DuelTeam> {
    // Desestruturando parametros a serem utilizados na funcao
    let { studentsIds } = duelTeamParams;

    // Excluindo a variavel que armazena o id dos conteudos da entidade
    delete duelTeamParams.studentsIds;

    // Armazenando os novos parametros em outra variavel
    let duelTeam = { ...duelTeamParams };

    // Obtendo o repositorio de conteudos
    const duelTeamParticipationRepository = await getCustomRepository(
      DuelTeamParticipationRepository
    );

    const participations =
      await duelTeamParticipationRepository.createManyDuelTeamParticipations({
        studentsIds,
      });

    const sortedParticipations = sortDuelTeamParticipations(participations);
    const participation = sortedParticipations[0];

    duelTeam = this.create({
      ...duelTeam,
      participation,
      participations,
    });

    // Criando o Team do duelo
    return await this.save({ ...duelTeam });
  }

  async createManyDuelTeams(
    duelTeamsParams: IManyDuelTeamsRequest
  ): Promise<DuelTeam[]> {
    const { basicDuelTeamsParams } = duelTeamsParams;
    const duelTeams: DuelTeam[] = [];

    await Promise.all(
      basicDuelTeamsParams.map(async (basicDuelTeamParams, index) => {
        const duelTeam = await this.createDuelTeam({
          ...basicDuelTeamParams,
          index,
        });
        duelTeams.push(duelTeam);
      })
    );

    return duelTeams;
  }

  async findAll(): Promise<DuelTeam[]> {
    return await this.find({
      relations: ['duelTeamOwner', 'questions', 'teams'],
    });
  }

  async findByDuelRoundId(duelRoundId: string): Promise<DuelTeam[]> {
    const duelRoundRepository = await getCustomRepository(DuelRoundRepository);
    const duelRound = await duelRoundRepository.findById(duelRoundId);

    const foundDuelTeams = await this.find({
      where: {
        duelRound,
      },
    });

    const duelTeams: DuelTeam[] = [];

    await Promise.all(
      foundDuelTeams.map(async (foundDuelTeam) => {
        const duelTeam = await this.findById(foundDuelTeam.id);
        duelTeams.push(duelTeam);

        return duelTeam;
      })
    );

    return duelTeams;
  }

  async findById(id: string): Promise<DuelTeam | undefined> {
    let duelTeam = await this.findOne(
      { id },
      { relations: ['participation', 'participations'] }
    );

    const { participation: participationFound } = duelTeam;

    const participations: DuelTeamParticipation[] = [];

    const duelTeamParticipationRepository = await getCustomRepository(
      DuelTeamParticipationRepository
    );

    await Promise.all(
      duelTeam.participations.map(async (participation) => {
        const foundParticipation =
          await duelTeamParticipationRepository.findById(participation.id);
        participations.push(foundParticipation);
      })
    );

    if (participationFound) {
      const participation = await duelTeamParticipationRepository.findById(
        participationFound.id
      );

      if (participation) {
        duelTeam = this.create({ ...duelTeam, participation });
      }
    }

    return { ...duelTeam, participations };
  }

  async updateById(updateFields: IDuelTeamRequest): Promise<void> {
    const { id } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      (key: string) => fields[key] === undefined && delete fields[key]
    );

    const { participationId } = fields;

    delete fields.participationId;

    let duelTeam = { ...fields };

    if (participationId) {
      const duelTeamParticipationRepository = await getCustomRepository(
        DuelTeamParticipationRepository
      );
      const participation = await duelTeamParticipationRepository.findById(
        participationId
      );

      if (participation) {
        duelTeam = this.create({ ...duelTeam, participation });
      }
    }

    await this.update({ id }, duelTeam);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return await this.delete({ id });
  }
}
