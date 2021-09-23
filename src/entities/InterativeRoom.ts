import { Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question";
import { Student } from "./Student";
import { Teacher } from "./Teacher";

@Entity()
export class InterativeRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Teacher, teacher => teacher.interativeRooms, {
    onUpdate: 'CASCADE',
  })
  teacher: Teacher;

  @ManyToMany(type => Teacher, teacher => teacher.interativeRoomParticipations, {
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  teachers: Teacher[];

  @ManyToMany(type => Student, student => student.interativeRoomParticipations, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinTable()
  students: Student[];

  @ManyToMany(type => Question, question => question.interativeRooms, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinTable()
  questions: Question[];
}