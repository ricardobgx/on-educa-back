import { Column, Entity, ManyToOne } from 'typeorm';
import { TeacherWeeklyPerformance } from './TeacherWeeklyPerformance';
import { UserWeekDayPerformance } from './UserWeekDayPerformance';

@Entity()
export class TeacherWeekDayPerformance extends UserWeekDayPerformance {
  @Column()
  contentsCreated: number;

  @Column()
  questionsCreated: number;

  @Column()
  doubtsSolved: number;

  @Column()
  interativeRoomsCreated: number;

  @ManyToOne(
    () => TeacherWeeklyPerformance,
    (weeklyPerformance) => weeklyPerformance.weekDays,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  weeklyPerformance: TeacherWeeklyPerformance;
}
