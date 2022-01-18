import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Alternative } from './Alternative';
import { PracticeQuestion } from './PracticeQuestion';

@Entity()
export class PracticeQuestionAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => PracticeQuestion, (question) => question.answer, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  question: PracticeQuestion;

  @ManyToOne(() => Alternative, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  selectedAlternative: Alternative;
}
