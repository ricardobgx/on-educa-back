import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Achievement from './Achievement';

@Entity()
export default class AchievementActivity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  activity: string;

  @ManyToOne(() => Achievement, (achievement) => achievement.activities, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  achievement: Achievement;
}
