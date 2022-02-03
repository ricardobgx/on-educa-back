import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Student } from './Student';
import { StudentWeekDayPerformance } from './StudentWeekDayPerformance';
import { UserWeeklyPerformance } from './UserWeeklyPerformance';

@Entity()
export class StudentWeeklyPerformance extends UserWeeklyPerformance {
  @OneToOne(() => Student, (student) => student.weeklyPerformance, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  student: Student;

  @OneToOne(() => StudentWeekDayPerformance, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  weekDay: StudentWeekDayPerformance;

  @OneToMany(
    () => StudentWeekDayPerformance,
    (studentWeekDayPerformance) => studentWeekDayPerformance.weeklyPerformance,
    {
      onUpdate: 'CASCADE',
    }
  )
  weekDays: StudentWeekDayPerformance[];
}
