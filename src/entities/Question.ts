import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Alternative } from './Alternative';
import { Content } from './Content';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  difficulty: number;

  @ManyToOne(() => Content, (content) => content.questions, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  content: Content;

  @OneToMany(() => Alternative, (alternative) => alternative.question, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  alternatives: Alternative[];

  @OneToOne(() => Alternative)
  @JoinColumn()
  rightAlternative: Alternative;
}
