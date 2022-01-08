import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DuelRoundQuestion } from './DuelRoundQuestion';
import { Alternative } from './Alternative';
import { DuelTeamParticipation } from './DuelTeamParticipation';

@Entity()
export class DuelQuestionAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => DuelTeamParticipation,
    (duelTeamParticipation) => duelTeamParticipation.duelQuestionsAnswers,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  duelTeamParticipation: DuelTeamParticipation;

  @OneToOne(() => DuelRoundQuestion, (duelRoundQuestion) => duelRoundQuestion.answer, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  question: DuelRoundQuestion;

  @ManyToOne(() => Alternative, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  selectedAlternative: Alternative;
}
