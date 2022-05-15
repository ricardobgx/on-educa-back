import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import AchievementActivity from './AchievementActivity';
import AchievementLevel from './AchievementLevel';
import AchievementProgress from './AchievementProgress';

@Entity()
export default class Achievement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => AchievementActivity,
    (achievementActivity) => achievementActivity.achievement
  )
  activities: AchievementActivity[];

  @Column()
  isStudentAchievement: boolean;

  @OneToMany(
    () => AchievementLevel,
    (achievementLevel) => achievementLevel.achievement,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  levels: AchievementLevel[];

  @OneToMany(
    () => AchievementProgress,
    (achievementProgress) => achievementProgress.achievement,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  progress: AchievementProgress[];
}
