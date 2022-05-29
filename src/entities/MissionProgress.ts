import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Mission from './Mission';
import { People } from './People';

@Entity()
export default class MissionProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  progress: number;

  @Column()
  status: number;

  @ManyToOne(() => People, (people) => people.missionsProgress, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  people: People;

  @ManyToOne(() => Mission, (mission) => mission.progress, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  mission: Mission;
}
