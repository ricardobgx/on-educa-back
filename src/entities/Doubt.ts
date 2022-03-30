import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Content } from './Content';
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
}
