import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @Column({ nullable: false })
  status: number;

  @ManyToOne(() => Duel, (duel) => duel.duelRounds, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  duel: Duel;

  @OneToOne(() => DuelTeam, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  team: DuelTeam;

  @OneToMany(() => DuelTeam, (teams) => teams.duelRound, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  teams: DuelTeam[];

  @OneToOne(() => DuelTeam, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  winnerTeam: DuelTeam;

  @OneToOne(() => DuelRoundQuestion, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  question: DuelRoundQuestion;

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
