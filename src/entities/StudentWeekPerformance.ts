import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './Student';
import { StudentWeekDayPerformance } from './StudentWeekDayPerformance';

@Entity()
export class StudentWeekPerformance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  xp: number;

  @OneToOne(() => Student, (student) => student.weekPerformance, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  student: Student;

  @OneToOne(() => StudentWeekDayPerformance, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  weekDay: StudentWeekDayPerformance;

  @OneToMany(
    () => StudentWeekDayPerformance,
    (studentWeekDayPerformance) => studentWeekDayPerformance.weekPerformance,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  weekDays: StudentWeekDayPerformance[];

  @Column()
  createdAt: string;
}
