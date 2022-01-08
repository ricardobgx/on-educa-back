import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DuelQuestionAnswer } from './DuelQuestionAnswer';
import { DuelRound } from './DuelRound';
import { Question } from './Question';

@Entity()
export class DuelRoundQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => DuelRound, (duelRound) => duelRound.questions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  duelRound: DuelRound;

  @ManyToOne(() => Question, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  question: Question;

  @OneToOne(
    () => DuelQuestionAnswer,
    (duelQuestionAnswer) => duelQuestionAnswer.question,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  answer: DuelQuestionAnswer;
}
