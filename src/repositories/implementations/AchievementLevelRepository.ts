import {
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IAchievementLevelRequest } from '../../dto/achievementLevel/IAchievementLevelRequest';
import AchievementLevel  from '../../entities/AchievementLevel';
import { ApplicationErrors } from '../../errors';
import { IAchievementLevelRepository } from '../interfaces/IAchievementLevelRepository';
import { AchievementRepository } from './AchievementRepository';

@EntityRepository(AchievementLevel)
export class AchievementLevelRepository
  extends Repository<AchievementLevel>
  implements IAchievementLevelRepository
{
  async createAchievementLevel(achievementLevelParams: IAchievementLevelRequest): Promise<AchievementLevel> {
    const { level, goal, achievementId } = achievementLevelParams;
    
    if (!achievementId) throw new ApplicationErrors('Id da conquista não informado', 400);

    const achievementRepository = await getCustomRepository(AchievementRepository);

    const achievement = await achievementRepository.findById(achievementId);

    if (!achievement) throw new ApplicationErrors('Conquista não encontrada', 404);

    const achievementLevel = this.create({ level, goal, achievement });

    return await this.save(achievementLevel);
  }

  async findAll(): Promise<AchievementLevel[]> {
    return await this.find({
      relations: ['achievement'],
    });
  }

  async findById(id: string): Promise<AchievementLevel> {
    return await this.findOne(
      { id },
      {
        relations: ['achievement'],
      }
    );
  }

  async updateById(updateFields: IAchievementLevelRequest): Promise<void> {
    const { id } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      (key) => fields[key] === undefined && delete fields[key]
    );

    await this.update({ id }, fields);
  }

  async deleteById(id: string): Promise<void> {
      await this.delete({ id });
  };
}
