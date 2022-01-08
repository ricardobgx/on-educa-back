import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IDuelTeamRequest } from '../../dto/IDuelTeamRequest';
import { IManyDuelTeamsRequest } from '../../dto/IManyDuelTeamsRequest';
import { DuelTeam } from '../../entities/DuelTeam';
import { IDuelTeamRepository } from '../interfaces/IDuelTeamRepository';
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
    // const duelTeamParticipationRepository = await getCustomRepository(
    //   DuelTeamParticipationRepository
    // );

    // const participations =
    //   await duelTeamParticipationRepository.createManyDuelTeamParticipations({
    //     studentsIds,
    //   });

    duelTeam = this.create({
      ...duelTeam,
      lastParticipantIndex: 0,
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
      basicDuelTeamsParams.map(async (basicDuelTeamParams) => {
        const duelTeam = await this.createDuelTeam({ ...basicDuelTeamParams });
        duelTeams.push(duelTeam);
        console.log(duelTeam);
      })
    );

    return duelTeams;
  }

  async findAll(): Promise<DuelTeam[]> {
    return await this.find({
      relations: ['duelTeamOwner', 'questions', 'teams'],
    });
  }

  async findById(id: string): Promise<DuelTeam | undefined> {
    return await this.findOne(
      { id },
      { relations: ['duelTeamOwner', 'questions', 'teams'] }
    );
  }

  async updateById(updateFields: IDuelTeamRequest): Promise<void> {
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
