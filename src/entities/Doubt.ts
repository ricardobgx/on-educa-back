import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Content } from './Content';
import { Student } from './Student';

@Entity()
export class Doubt {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  status: boolean;

  @Column()
  createdAt: Date;

  // @ManyToOne(() => Student, student => student.doubts, {
  //   onUpdate: 'CASCADE',
  // })
  // student: Student;

  // @ManyToOne(() => Content, content => content.doubts, {
  //   onUpdate: 'CASCADE',
  // })
  // content: Content;
}
