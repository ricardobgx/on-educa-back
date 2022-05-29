import { IMissionRequest } from '../../../dto/mission/IMissionRequest';
import Mission from '../../../entities/Mission';

export interface IMissionRepository {
  createMission(missionParams: IMissionRequest): Promise<Mission>;
  findAll(): Promise<Mission[]>;
  findById(id: string): Promise<Mission | undefined>;
  updateById(updateFields: IMissionRequest): Promise<void>;
  deleteById(id: string): Promise<void>;
}
