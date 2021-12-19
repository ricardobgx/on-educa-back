import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DuelQuestion } from './DuelQuestion';
import { Alternative } from './Alternative';
import { DuelTeamParticipation } from './DuelTeamParticipation';

@Entity()
export class DuelQuestionAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    (type) => DuelTeamParticipation,
    (duelTeamParticipation) => duelTeamParticipation.duelQuestionsAnswers,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  duelTeamParticipation: DuelTeamParticipation;

  @OneToOne((type) => DuelQuestion, (duelQuestion) => duelQuestion.answer, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  question: DuelQuestion;

  @ManyToOne(() => Alternative, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  selectedAlternative: Alternative;
}
