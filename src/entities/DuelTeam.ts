import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Duel } from './Duel';
import { DuelTeamParticipation } from './DuelTeamParticipation';

@Entity()
export class DuelTeam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column()
  lastParticipantIndex: number;

  @ManyToOne((type) => Duel, (duel) => duel.teams, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  duel: Duel;

  @ManyToOne(
    (type) => DuelTeamParticipation,
    (participations) => participations.duelTeam,
    {
      onUpdate: 'CASCADE',
    }
  )
  @JoinTable()
  participations: DuelTeamParticipation[];
}
