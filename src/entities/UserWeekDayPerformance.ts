import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class UserWeekDayPerformance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dailyXp: number;

  @Column({ type: 'timestamptz' })
  createdAt: Date;
}
