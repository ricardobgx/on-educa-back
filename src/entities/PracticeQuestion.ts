import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Practice } from './Practice';
import { PracticeQuestionAnswer } from './PracticeQuestionAnswer';
import { Question } from './Question';

@Entity()
export class PracticeQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Practice, (practice) => practice.questions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  practice: Practice;

  @OneToOne(() => Question, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  question: Question;

  @OneToOne(
    () => PracticeQuestionAnswer,
    (practiceQuestionAnswer) => practiceQuestionAnswer.question,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  @JoinColumn()
  answer: PracticeQuestionAnswer;
}
