import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @ManyToOne(() => DuelRound, (duelTeam) => duelTeam.teams, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  duelRound: DuelRound;

  @OneToOne(() => DuelTeamParticipation, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  participation: DuelTeamParticipation;

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
