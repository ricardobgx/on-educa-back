import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
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

  @Column()
  lastParticipantIndex: number;

  @ManyToOne(() => DuelRound, (duelTeam) => duelTeam.teams, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  duelRound: DuelRound;

  @ManyToOne(
    () => DuelTeamParticipation,
    (participations) => participations.duelTeam,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  @JoinTable()
  participations: DuelTeamParticipation[];
}
