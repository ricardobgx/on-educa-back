import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SchoolGrade } from "./SchoolGrade";

@Entity()
export class TeachingType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(type => SchoolGrade, schoolGrades => schoolGrades.teachingType, {
    onUpdate: 'CASCADE',
    onDelete:'CASCADE'
  })
  schoolGrades: SchoolGrade[];
}