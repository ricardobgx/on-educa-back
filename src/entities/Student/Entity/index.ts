import { Entity, Column } from 'typeorm';

import User from '../../User/Entity';

@Entity('student')
export default class Student extends User {
  
  @Column()
  schoolGrade: number;

}