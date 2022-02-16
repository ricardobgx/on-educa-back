import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DuelRound } from './DuelRound';
import { Student } from './Student';

@Entity()
export class Duel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @ManyToOne(() => Student, (student) => student.duels, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  student: Student;

  @OneToOne(() => DuelRound, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  duelRound: DuelRound;

  @OneToMany(() => DuelRound, (duelRounds) => duelRounds.duel, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  duelRounds: DuelRound[];

  @Column({ type: 'timestamptz' })
  createdAt: Date;
}
