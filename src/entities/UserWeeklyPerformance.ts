import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class UserWeeklyPerformance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  xp: number;
}
