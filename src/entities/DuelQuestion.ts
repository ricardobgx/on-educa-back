import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Duel } from './Duel';
import { DuelQuestionAnswer } from './DuelQuestionAnswer';
import { Question } from './Question';

@Entity()
export class DuelQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Duel, (duel) => duel.questions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  duel: Duel;

  @ManyToOne((type) => Question, (question) => question.duels, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  question: Question;

  @OneToOne(
    (type) => DuelQuestionAnswer,
    (duelQuestionAnswer) => duelQuestionAnswer.question
  )
  answer: DuelQuestionAnswer;
}
