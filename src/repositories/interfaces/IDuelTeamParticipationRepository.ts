import { DeleteResult } from 'typeorm';
import { IChangeDuelTeamPositionRequest } from '../../dto/duelTeamParticipation/IChangeDuelTeamPositionRequest';
import { IDuelTeamParticipationRequest } from '../../dto/duelTeamParticipation/IDuelTeamParticipationRequest';
import { IManyDuelTeamParticipationRequest } from '../../dto/duelTeamParticipation/IManyDuelTeamParticipationRequest';
import { IParticipateInDuelRequest } from '../../dto/duel/IParticipateInDuelRequest';
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
  exitDuelTeamParticipation(id: string): Promise<void>;
  findAll(name?: string): Promise<DuelTeamParticipation[]>;
  findByDuelTeam(id: string): Promise<DuelTeamParticipation[]>;
  findById(id: string): Promise<DuelTeamParticipation | undefined>;
  changeDuelTeamPosition(
    changeDuelTeamPositionParams: IChangeDuelTeamPositionRequest
  ): Promise<void>;
  updateById(updateFields: IDuelTeamParticipationRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}
