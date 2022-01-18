import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Content } from './Content';
import { PracticeQuestion } from './PracticeQuestion';
import { Student } from './Student';

@Entity()
export class Practice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, (student) => student.practices, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  student: Student;

  @ManyToOne(() => Content, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  content: Content;

  @OneToMany(() => PracticeQuestion, (questions) => questions.practice, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  questions: PracticeQuestion[];
}
