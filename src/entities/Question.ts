import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Alternative } from './Alternative';
import { Content } from './Content';
import { Duel } from './Duel';
import { InterativeRoom } from './InterativeRoom';

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

  @ManyToMany(() => Duel, (duel) => duel.questions, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  duels: Duel[];

  @ManyToMany(
    () => InterativeRoom,
    (interativeRoom) => interativeRoom.questions,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  interativeRooms: InterativeRoom[];
}
