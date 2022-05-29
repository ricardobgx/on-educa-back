import { IMissionActivityRequest } from '../missionActivity/IMissionActivityRequest';

export interface IMissionRequest {
  id?: string;
  description?: string;
  goal?: number;
  isStudentMission?: boolean;
  reward?: number;
  activities?: IMissionActivityRequest[];
}
