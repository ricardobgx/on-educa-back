import { IMissionProgressRequest } from '../../../dto/missionProgress/IMissionProgressRequest';
import { IMissionProgressSearchParams } from '../../../dto/missionProgress/IMissionProgressSearchParams';
import MissionProgress from '../../../entities/MissionProgress';

export interface IMissionProgressRepository {
  createMissionProgress(
    missionProgressParams: IMissionProgressRequest
  ): Promise<MissionProgress>;
  findAll(
    searchParams: IMissionProgressSearchParams
  ): Promise<MissionProgress[]>;
  findById(id: string): Promise<MissionProgress | undefined>;
  updateById(updateFields: IMissionProgressRequest): Promise<void>;
  deleteById(id: string): Promise<void>;
}
