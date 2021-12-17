import {
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DuelQuestionAnswer } from './DuelQuestionAnswer';
import { DuelTeam } from './DuelTeam';
import { Student } from './Student';

@Entity()
export class DuelTeamParticipation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => DuelTeam, (duelTeam) => duelTeam.participations, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  duelTeam: DuelTeam;

  @ManyToOne((type) => Student, (student) => student.duelTeamsParticipations, {
    onUpdate: 'CASCADE',
  })
  student: Student;

  @OneToMany(
    (type) => DuelQuestionAnswer,
    (duelQuestionAnswer) => duelQuestionAnswer.duelTeamParticipation,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  duelQuestionsAnswers: DuelQuestionAnswer[];
}
