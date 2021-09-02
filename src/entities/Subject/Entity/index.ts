import { Entity, PrimaryColumn, Column, ManyToMany, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import Content from '../../Content/Entity';
import Teacher from '../../Teacher/Entity';

@Entity('subject')
export default class Subject {
  
  constructor() {
    if (!this.id) this.id = uuid();
  }

  @PrimaryColumn({ unique: true })
  readonly id: string;

  @Column()
  nome: string;

  @ManyToMany(() => Teacher, teacher => teacher.subjects)
  teachers: Teacher[];

  @ManyToOne(() => Content, content => content.subject)
  contents: Content[];
  
}