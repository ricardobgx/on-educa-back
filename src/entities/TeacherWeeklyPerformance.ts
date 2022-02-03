import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Teacher } from './Teacher';
import { TeacherWeekDayPerformance } from './TeacherWeekDayPerformance';
import { UserWeeklyPerformance } from './UserWeeklyPerformance';

@Entity()
export class TeacherWeeklyPerformance extends UserWeeklyPerformance {
  // Professor

  @OneToOne(() => Teacher, (teacher) => teacher.weeklyPerformance, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  teacher: Teacher;

  // Desempenho do dia

  @OneToOne(() => TeacherWeekDayPerformance, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  weekDay: TeacherWeekDayPerformance;

  // Desempenho dos dias

  @OneToMany(
    () => TeacherWeekDayPerformance,
    (teacherWeekDayPerformance) => teacherWeekDayPerformance.weeklyPerformance,
    {
      onUpdate: 'CASCADE',
    }
  )
  weekDays: TeacherWeekDayPerformance[];
}
