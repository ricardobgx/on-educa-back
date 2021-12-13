import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Student";
import { Subject } from "./Subject";
import { TeachingType } from "./TeachingType";

@Entity()
export class SchoolGrade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  index: number;

  @OneToMany(type => Student, students => students.schoolGrade, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  students: Student[];

  @OneToMany(type => Subject, subjects => subjects.schoolGrade, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  subjects: Subject[];

  @ManyToOne(type => TeachingType, teachingType => teachingType.schoolGrades, {
    onUpdate: 'CASCADE'
  })
  teachingType: TeachingType;
}