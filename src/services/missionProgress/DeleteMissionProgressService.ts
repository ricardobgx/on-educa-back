import { getCustomRepository, ObjectType } from 'typeorm';
import { IMissionProgressRepository } from '../../repositories/interfaces/mission/IMissionProgressRepository';

export class DeleteMissionProgressService {
  missionProgressRepository: IMissionProgressRepository;

  constructor(missionProgressRepository: IMissionProgressRepository) {
    this.missionProgressRepository = missionProgressRepository;
  }

  async execute(id: string): Promise<void> {
    const missionProgressRepository = getCustomRepository(
      this
        .missionProgressRepository as unknown as ObjectType<IMissionProgressRepository>
    );

    await missionProgressRepository.deleteById(id);
  }
}
