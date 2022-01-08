import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Duel } from './Duel';
import { DuelRoundQuestion } from './DuelRoundQuestion';
import { DuelTeam } from './DuelTeam';

@Entity()
export class DuelRound {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  maxGroupParticipants: number;

  @Column()
  questionsPerContent: number;

  @Column()
  timeForQuestion: number;

  @ManyToOne(() => Duel, (duel) => duel.duelRounds, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  duel: Duel;

  @OneToMany(() => DuelTeam, (teams) => teams.duelRound, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  teams: DuelTeam[];

  @OneToMany(
    () => DuelRoundQuestion,
    (duelRoundQuestions) => duelRoundQuestions.duelRound,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  questions: DuelRoundQuestion[];
}
