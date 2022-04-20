import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SchoolGrade } from './SchoolGrade';
import { Unity } from './Unity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Unity, (units) => units.subject, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  units: Unity[];

  @ManyToOne(() => SchoolGrade, (schoolGrade) => schoolGrade.subjects, {
    onUpdate: 'CASCADE',
  })
  schoolGrade: SchoolGrade;
}
