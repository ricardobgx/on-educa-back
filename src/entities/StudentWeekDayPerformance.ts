import { Column, Entity, ManyToOne } from 'typeorm';
import { StudentWeeklyPerformance } from './StudentWeeklyPerformance';
import { UserWeekDayPerformance } from './UserWeekDayPerformance';

@Entity()
export class StudentWeekDayPerformance extends UserWeekDayPerformance {
  @Column()
  contentsStudied: number;

  @Column()
  questionsAnswered: number;

  @Column()
  questionsAnsweredCorrectly: number;

  @Column()
  duelsParticipated: number;

  @Column()
  duelsWon: number;

  @ManyToOne(
    () => StudentWeeklyPerformance,
    (weeklyPerformance) => weeklyPerformance.weekDays,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  weeklyPerformance: StudentWeeklyPerformance;
}
