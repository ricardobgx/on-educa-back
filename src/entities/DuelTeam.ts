import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DuelRound } from './DuelRound';
import { DuelTeamParticipation } from './DuelTeamParticipation';

@Entity()
export class DuelTeam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  index: number;

  @Column()
  lastParticipationIndex: number;

  @ManyToOne(() => DuelRound, (duelTeam) => duelTeam.teams, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  duelRound: DuelRound;

  @OneToMany(
    () => DuelTeamParticipation,
    (participations) => participations.duelTeam,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  participations: DuelTeamParticipation[];
}
