import { DeleteResult } from 'typeorm';
import { IChangeDuelTeamPositionRequest } from '../../dto/IChangeDuelTeamPositionRequest';
import { IDuelTeamParticipationRequest } from '../../dto/IDuelTeamParticipationRequest';
import { IManyDuelTeamParticipationRequest } from '../../dto/IManyDuelTeamParticipationRequest';
import { IParticipateInDuelRequest } from '../../dto/IParticipateInDuelRequest';
import { DuelTeamParticipation } from '../../entities/DuelTeamParticipation';

export interface IDuelTeamParticipationRepository {
  createDuelTeamParticipation(
    duelTeamParticipationParams: IDuelTeamParticipationRequest
  ): Promise<DuelTeamParticipation>;
  createManyDuelTeamParticipations(
    duelTeamParticipationsParams: IManyDuelTeamParticipationRequest
  ): Promise<DuelTeamParticipation[]>;
  participateInDuel(
    participateInDuelParams: IParticipateInDuelRequest
  ): Promise<DuelTeamParticipation | undefined>;
  findAll(name?: string): Promise<DuelTeamParticipation[]>;
  findByDuelTeam(id: string): Promise<DuelTeamParticipation[]>;
  findById(id: string): Promise<DuelTeamParticipation | undefined>;
  changeDuelTeamPosition(
    changeDuelTeamPositionParams: IChangeDuelTeamPositionRequest
  ): Promise<void>;
  updateById(updateFields: IDuelTeamParticipationRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
