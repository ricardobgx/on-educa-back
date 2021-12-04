import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Content } from "./Content";
import { SchoolGrade } from "./SchoolGrade";
import { Teacher } from "./Teacher";
import { Unity } from "./Unity";

@Entity()
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(type => Unity, units => units.subject, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  units: Unity[];

  @ManyToOne(type => SchoolGrade, schoolGrade => schoolGrade.subjects, {
    onUpdate: 'CASCADE'
  })
  schoolGrade: SchoolGrade;
}