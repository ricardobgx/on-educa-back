import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SchoolGrade } from "./SchoolGrade";
import { Student } from "./Student";
import { Teacher } from "./Teacher";

@Entity()
export class TeachingType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(type => Teacher, teachers => teachers.teachingType)
  teachers: Teacher[];

  @OneToMany(type => SchoolGrade, schoolGrades => schoolGrades.teachingType, {
    onUpdate: 'CASCADE',
    onDelete:'CASCADE'
  })
  schoolGrades: SchoolGrade[];
}