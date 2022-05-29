import { IMissionActivityRequest } from '../../../dto/missionActivity/IMissionActivityRequest';
import MissionActivity from '../../../entities/MissionActivity';

export interface IMissionActivityRepository {
  createMissionActivity(
    missionActivityParams: IMissionActivityRequest
  ): Promise<MissionActivity>;
  findAll(): Promise<MissionActivity[]>;
  findById(id: string): Promise<MissionActivity | undefined>;
  updateById(updateFields: IMissionActivityRequest): Promise<void>;
  deleteById(id: string): Promise<void>;
}
