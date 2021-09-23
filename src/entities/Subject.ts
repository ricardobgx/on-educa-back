import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Content } from "./Content";
import { Teacher } from "./Teacher";

@Entity()
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @OneToMany(type => Content, content => content.subject, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  contents: Content[];

  @ManyToMany(type => Teacher, teacher => teacher.subjects, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinTable()
  teachers: Teacher[];
}