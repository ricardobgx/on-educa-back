import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Content } from './Content';
import { Student } from './Student';

@Entity()
export class ContentReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  createdAt: Date;

  // @ManyToOne(() => Student, student => student.contentReviews, {
  //   onUpdate: 'CASCADE',
  //   onDelete: 'CASCADE'
  // })
  // student: Student;

  // @ManyToMany(() => Content, (content) => content.contentReviews, {
  //   onUpdate: 'CASCADE',
  //   onDelete: 'CASCADE',
  // })
  // @JoinTable()
  // contents: Content[];
}
