import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Achievement from './Achievement';
import AchievementLevel from './AchievementLevel';
import { People } from './People';

@Entity()
export default class AchievementProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  progress: number;

  @Column()
  status: number;

  @ManyToOne(() => People, (people) => people.achievementsProgress, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  people: People;

  @ManyToOne(
    () => AchievementLevel,
    (achievementLevel) => achievementLevel.progress,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  level: AchievementLevel;

  @ManyToOne(() => Achievement, (achievement) => achievement.progress, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  achievement: Achievement;
}
