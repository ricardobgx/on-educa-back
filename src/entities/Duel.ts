import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question";
import { Student } from "./Student";

@Entity()
export class Duel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  maxGroupParts: number;

  @ManyToOne(type => Student, student => student.duels, {
    onUpdate: 'CASCADE',
  })
  student: Student;

  @ManyToMany(type => Student, student => student.duelParticipations, {
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  students: Student[];

  @ManyToMany(type => Question, question => question.duels, {
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  questions: Question[];
}