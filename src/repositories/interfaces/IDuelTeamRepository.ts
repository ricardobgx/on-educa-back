import { DeleteResult } from 'typeorm';
import { IDuelTeamRequest } from '../../dto/duelTeam/IDuelTeamRequest';
import { DuelTeam } from '../../entities/DuelTeam';

export interface IDuelTeamRepository {
  createDuelTeam(duelTeamParams: IDuelTeamRequest): Promise<DuelTeam>;
  findAll(name?: string): Promise<DuelTeam[]>;
  findByDuelRoundId(duelRoundId: string): Promise<DuelTeam[]>;
  findById(id: string): Promise<DuelTeam | undefined>;
  updateById(updateFields: IDuelTeamRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
