import { Entity, ManyToMany } from 'typeorm';

import Subject from '../../Subject/Entity';
import User from '../../User/Entity';

@Entity('teacher')
export default class Teacher extends User {
  
  @ManyToMany(() => Subject, subject => subject.teachers)
  subjects: Subject[];

}