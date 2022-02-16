import { IUnityRequest } from '../../dto/unity/IUnityRequest';
import { Unity } from '../../entities/Unity';

export interface IUnityRepository {
  createUnity(unityParams: IUnityRequest): Promise<Unity>;
  findAll(): Promise<Unity[]>;
  findBySubject(subjectId: string): Promise<Unity[]>;
  findById(id: string): Promise<Unity | undefined>;
  updateById(updateFields: IUnityRequest): Promise<void>;
  deleteById(id: string): Promise<void>;
}
