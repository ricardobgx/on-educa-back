import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DuelQuestionAnswer } from './DuelQuestionAnswer';
import { DuelTeam } from './DuelTeam';
import { Student } from './Student';

@Entity()
export class DuelTeamParticipation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => DuelTeam, (duelTeam) => duelTeam.participations, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  duelTeam: DuelTeam;

  @ManyToOne(() => Student, (student) => student.duelTeamsParticipations, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  student: Student;

  @OneToMany(
    () => DuelQuestionAnswer,
    (duelQuestionAnswer) => duelQuestionAnswer.duelTeamParticipation,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  duelQuestionsAnswers: DuelQuestionAnswer[];
}
