import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StudentWeekPerformance } from './StudentWeekPerformance';

@Entity()
export class StudentWeekDayPerformance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dailyXP: number;

  @Column()
  studiedContents: number;

  @Column()
  questionsAnswered: number;

  @Column()
  rightQuestionsAnswered: number;

  @Column()
  duelsParticipated: number;

  @Column()
  duelsWon: number;

  @Column()
  date: string;

  @ManyToOne(
    () => StudentWeekPerformance,
    (weekPerformance) => weekPerformance.weekDays,
    {
      onUpdate: 'CASCADE',
    }
  )
  weekPerformance: StudentWeekPerformance;
}
