import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SchoolGrade } from './SchoolGrade';
import { StudentWeeklyPerformance } from './StudentWeeklyPerformance';
import { People } from './People';

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
}
