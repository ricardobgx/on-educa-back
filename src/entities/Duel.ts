import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DuelQuestion } from './DuelQuestion';
import { DuelTeam } from './DuelTeam';
import { Student } from './Student';

@Entity()
export class Duel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  maxGroupParticipants: number;

  @Column({ nullable: false })
  questionsPerContent: number;

  @Column({ nullable: false })
  timeForQuestion: number;

  @ManyToOne((type) => Student, (student) => student.duels, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  owner: Student;

  @OneToMany((type) => DuelTeam, (teams) => teams.duel, {
    onUpdate: 'CASCADE',
  })
  teams: DuelTeam[];

  @ManyToMany((type) => DuelQuestion, (questions) => questions.duel, {
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  questions: DuelQuestion[];
}
