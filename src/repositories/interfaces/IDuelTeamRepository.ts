import { DeleteResult } from 'typeorm';
import { IDuelTeamRequest } from '../../dto/IDuelTeamRequest';
import { DuelRound } from '../../entities/DuelRound';
import { DuelTeam } from '../../entities/DuelTeam';

export interface IDuelTeamRepository {
  createDuelTeam(duelTeamParams: IDuelTeamRequest): Promise<DuelTeam>;
  findAll(name?: string): Promise<DuelTeam[]>;
  findByDuelRound(duelRound: DuelRound): Promise<DuelTeam[]>;
  findById(id: string): Promise<DuelTeam | undefined>;
  updateById(updateFields: IDuelTeamRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
