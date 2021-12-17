import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DuelQuestionAnswer } from './DuelQuestionAnswer';
import { Question } from './Question';

@Entity()
export class Alternative {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  index: number;

  @ManyToOne(() => Question, (question) => question.alternatives, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  question: Question;

  @OneToMany(
    () => DuelQuestionAnswer,
    (duelQuestionAnswer) => duelQuestionAnswer.selectedAlternative,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  duelQuestionAlternative: DuelQuestionAnswer;
}
