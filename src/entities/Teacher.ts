import {
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeacherWeeklyPerformance } from './TeacherWeeklyPerformance';
import { TeachingType } from './TeachingType';
import { People } from './People';
import { DoubtComment } from './DoubtComment';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Usuario

  @OneToOne(() => People, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  people: People;

  // Tipo de ensino

  @ManyToOne(() => TeachingType, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  teachingType: TeachingType;

  // Desempenho semanal

  @OneToOne(
    () => TeacherWeeklyPerformance,
    (weeklyPerformance) => weeklyPerformance.teacher,
    {
      onUpdate: 'CASCADE',
    }
  )
  weeklyPerformance: TeacherWeeklyPerformance;
}
