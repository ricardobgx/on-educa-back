import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './Question';
import { Student } from './Student';
import { Teacher } from './Teacher';

@Entity()
export class InterativeRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => Teacher, (teacher) => teacher.interativeRooms, {
  //   onUpdate: 'CASCADE',
  // })
  // teacher: Teacher;

  // @ManyToMany(
  //   () => Teacher,
  //   (teacher) => teacher.interativeRoomParticipations,
  //   {
  //     onUpdate: 'CASCADE',
  //   }
  // )
  // @JoinTable()
  // teachers: Teacher[];

  // @ManyToMany(
  //   () => Student,
  //   (student) => student.interativeRoomParticipations,
  //   {
  //     onUpdate: 'CASCADE',
  //     onDelete: 'CASCADE',
  //   }
  // )
  // @JoinTable()
  // students: Student[];

  @ManyToMany(() => Question, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable()
  questions: Question[];
}
