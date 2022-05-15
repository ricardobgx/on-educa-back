import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Achievement from "./Achievement";
import AchievementProgress from "./AchievementProgress";

@Entity()
export default class AchievementLevel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  level: number;

  @Column()
  goal: number;

  @ManyToOne(() => Achievement, achievement => achievement.levels, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  achievement: Achievement;

  @OneToMany(() => AchievementProgress, achievementProgress => achievementProgress.level, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  progress: AchievementProgress[];
}