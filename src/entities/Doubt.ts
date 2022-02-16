import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Doubt {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  status: boolean;

  @Column({ type: 'timestamptz' })
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
