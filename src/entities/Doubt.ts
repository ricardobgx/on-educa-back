import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Content } from './Content';
import { DoubtComment } from './DoubtComment';
import { Student } from './Student';

@Entity()
export class Doubt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  status: number;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => Student, (student) => student.doubts, {
    onUpdate: 'CASCADE',
  })
  student: Student;

  @ManyToOne(() => Content, (content) => content.doubts, {
    onUpdate: 'CASCADE',
  })
  content: Content;

  // Comentarios
  @OneToMany(() => DoubtComment, (comments) => comments.doubt, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  comments: DoubtComment[];
}
