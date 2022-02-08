import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SchoolGrade } from './SchoolGrade';
import { StudentWeeklyPerformance } from './StudentWeeklyPerformance';
import { People } from './People';
import { Duel } from './Duel';
import { DuelTeamParticipation } from './DuelTeamParticipation';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Usuario

  @OneToOne(() => People, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  people: People;

  // Serie escolar

  @ManyToOne(() => SchoolGrade, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  schoolGrade: SchoolGrade;

  // Desempenho semanal

  @OneToOne(
    () => StudentWeeklyPerformance,
    (weeklyPerformance) => weeklyPerformance.student,
    {
      onUpdate: 'CASCADE',
    }
  )
  weeklyPerformance: StudentWeeklyPerformance;

  @OneToMany(() => Duel, (duel) => duel.student, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  duels: Duel[];

  @ManyToOne(
    () => DuelTeamParticipation,
    (duelTeamParticipations) => duelTeamParticipations.student,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  duelTeamParticipations: DuelTeamParticipation[];
}
