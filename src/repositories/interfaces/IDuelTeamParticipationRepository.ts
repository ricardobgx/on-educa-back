import { DeleteResult } from 'typeorm';
import { IDuelTeamParticipationByDuelRequest } from '../../dto/IDuelTeamParticipationByDuelRequest';
import { IDuelTeamParticipationRequest } from '../../dto/IDuelTeamParticipationRequest';
import { IManyDuelTeamParticipationRequest } from '../../dto/IManyDuelTeamParticipationRequest';
import { DuelTeamParticipation } from '../../entities/DuelTeamParticipation';

export interface IDuelTeamParticipationRepository {
  createDuelTeamParticipation(
    duelTeamParticipationParams: IDuelTeamParticipationRequest
  ): Promise<DuelTeamParticipation>;
  createManyDuelTeamParticipations(
    duelTeamParticipationsParams: IManyDuelTeamParticipationRequest
  ): Promise<DuelTeamParticipation[]>;
  createDuelTeamParticipationByDuelId(
    createDuelParticipationByDuelParams: IDuelTeamParticipationByDuelRequest
  ): Promise<DuelTeamParticipation | undefined>;
  findAll(name?: string): Promise<DuelTeamParticipation[]>;
  findByDuelTeam(id: string): Promise<DuelTeamParticipation[]>;
  findById(id: string): Promise<DuelTeamParticipation | undefined>;
  updateById(updateFields: IDuelTeamParticipationRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
