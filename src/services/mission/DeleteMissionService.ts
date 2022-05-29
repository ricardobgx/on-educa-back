import { getCustomRepository, ObjectType } from 'typeorm';
import { IMissionRepository } from '../../repositories/interfaces/mission/IMissionRepository';

export class DeleteMissionService {
  missionRepository: IMissionRepository;

  constructor(missionRepository: IMissionRepository) {
    this.missionRepository = missionRepository;
  }

  async execute(id: string): Promise<void> {
    const missionRepository = getCustomRepository(
      this.missionRepository as unknown as ObjectType<IMissionRepository>
    );

    await missionRepository.deleteById(id);
  }
}
