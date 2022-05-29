import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import MissionActivity from './MissionActivity';
import MissionProgress from './MissionProgress';

@Entity()
export default class Mission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  goal: number;

  @OneToMany(
    () => MissionActivity,
    (missionActivity) => missionActivity.mission
  )
  activities: MissionActivity[];

  @Column()
  reward: number;

  @Column()
  isStudentMission: boolean;

  @OneToMany(
    () => MissionProgress,
    (missionProgress) => missionProgress.mission,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  progress: MissionProgress[];
}
