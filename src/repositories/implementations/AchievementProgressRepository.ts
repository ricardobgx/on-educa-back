import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { IAchievementProgressRequest } from '../../dto/achievementProgress/IAchievementProgressRequest';
import AchievementProgress from '../../entities/AchievementProgress';
import { ApplicationErrors } from '../../errors';
import { IAchievementProgressRepository } from '../interfaces/IAchievementProgressRepository';
import { PeopleRepository } from './PeopleRepository';
import { AchievementLevelRepository } from './AchievementLevelRepository';
import { IAchievementProgressByPeopleAndAchievement } from '../../dto/achievementProgress/IAchievementProgressByPeopleAndAchievement';
import { AchievementRepository } from './AchievementRepository';
import { EAchievementProgressStatus } from '../../enums/EAchievementProgressStatus';
import { EAchievementLevel } from '../../enums/EAchievementLevel';

@EntityRepository(AchievementProgress)
export class AchievementProgressRepository
  extends Repository<AchievementProgress>
  implements IAchievementProgressRepository
{
  async createAchievementProgress(
    achievementProgressParams: IAchievementProgressRequest
  ): Promise<AchievementProgress> {
    const { peopleId, achievementId } = achievementProgressParams;

    if (!peopleId)
      throw new ApplicationErrors('Id da pessoa não informada', 400);

    if (!achievementId)
      throw new ApplicationErrors('Id da conquista não informado', 400);

    const peopleRepository = await getCustomRepository(PeopleRepository);
    const people = await peopleRepository.findById(peopleId);

    if (!people) throw new ApplicationErrors('Pessoa não encontrada', 404);

    const achievementRepository = await getCustomRepository(
      AchievementRepository
    );
    const achievement = await achievementRepository.findById(achievementId);

    if (!achievement)
      throw new ApplicationErrors('Conquista não encontrada', 404);

    const level = achievement.levels.find(
      (level) => level.level === EAchievementLevel.BRONZE
    );

    if (!level)
      throw new ApplicationErrors('Nível de conquista não encontrado', 404);

    const achievementProgress = this.create({
      progress: 0,
      status: EAchievementProgressStatus.INCOMPLETED,
      people,
      level,
    });

    return await this.save(achievementProgress);
  }

  async findAll(): Promise<AchievementProgress[]> {
    return await this.find({
      relations: ['level', 'people'],
    });
  }

  async findByAchievementAndPeople(
    searchParams: IAchievementProgressByPeopleAndAchievement
  ): Promise<AchievementProgress> {
    const { peopleId, achievementId } = searchParams;

    const achievementRepository = await getCustomRepository(
      AchievementRepository
    );
    const achievement = await achievementRepository.findById(achievementId);

    if (!achievement)
      throw new ApplicationErrors('Conquista não encontrada', 404);

    const peopleRepository = await getCustomRepository(PeopleRepository);

    const people = await peopleRepository.findById(peopleId);

    const achievementProgressFound = await this.findOne({
      where: {
        people,
        achievement,
      },
      relations: ['level', 'people'],
    });

    if (achievementProgressFound) return achievementProgressFound;

    return await this.createAchievementProgress({ peopleId, achievementId });
  }

  async findById(id: string): Promise<AchievementProgress> {
    return await this.findOne(
      { id },
      {
        relations: ['level', 'people'],
      }
    );
  }

  async updateById(updateFields: IAchievementProgressRequest): Promise<void> {
    const { id } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      (key) => fields[key] === undefined && delete fields[key]
    );

    await this.update({ id }, fields);
  }

  async deleteById(id: string): Promise<void> {
    await this.delete({ id });
  }
}
