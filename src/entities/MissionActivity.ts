import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Mission from './Mission';

@Entity()
export default class MissionActivity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  activity: string;

  @ManyToOne(() => Mission, (mission) => mission.activities, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  mission: Mission;
}
