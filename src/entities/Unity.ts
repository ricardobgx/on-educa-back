import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Content } from './Content';
import { Subject } from './Subject';

@Entity()
export class Unity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Content, (contents) => contents.unity, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  contents: Content[];

  @ManyToOne(() => Subject, (subject) => subject.units, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  subject: Subject;
}
