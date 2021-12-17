import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(
    (type) => Alternative,
    (alternative) => alternative.duelQuestionAlternative,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  selectedAlternative: Alternative;
}
