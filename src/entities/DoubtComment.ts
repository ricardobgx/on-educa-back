import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Doubt } from './Doubt';
import { People } from './People';

@Entity()
export class DoubtComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  content: string;

  @ManyToOne(() => People, (peoples) => peoples.doubtsComments, {
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  people: People;

  @ManyToOne(() => Doubt, (doubt) => doubt.comments, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  doubt: Doubt;

  @Column({ type: 'timestamptz' })
  createdAt: Date;
}
