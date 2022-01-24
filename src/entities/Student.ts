import {
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ContentReview } from './ContentReview';
import { Doubt } from './Doubt';
import { Duel } from './Duel';
import { DuelTeamParticipation } from './DuelTeamParticipation';
import { InterativeRoom } from './InterativeRoom';
import { SchoolGrade } from './SchoolGrade';
import { StudStudChat } from './StudStudChat';
import { StudStudMessage } from './StudStudMessage';
import { StudTeachChat } from './StudTeachChat';
import { StudTeachMessage } from './StudTeachMessage';
import { User } from './User';
import { StudentWeekPerformance } from './StudentWeekPerformance';

@Entity()
export class Student extends User {
  @ManyToOne(() => SchoolGrade, (schoolGrade) => schoolGrade.students, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  schoolGrade: SchoolGrade;

  // Desempenho

  @OneToOne(
    () => StudentWeekPerformance,
    (weekPerformance) => weekPerformance.student,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  weekPerformance: StudentWeekPerformance;

  // Duvidas
  @OneToMany(() => Doubt, (doubt) => doubt.student, {
    cascade: true,
  })
  doubts: Doubt[];

  // Revisoes de conteudo
  @OneToMany(() => ContentReview, (contentReview) => contentReview.student, {
    cascade: true,
  })
  contentReviews: ContentReview[];

  // Duelos criados

  @OneToMany(() => Duel, (duel) => duel.student, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  duels: Duel[];

  // Duelos participados

  @ManyToMany(
    () => DuelTeamParticipation,
    (duelTeamsParticipations) => duelTeamsParticipations.student,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  duelTeamsParticipations: DuelTeamParticipation[];

  // Sala interativas participadas

  @ManyToMany(() => InterativeRoom, (interativeRoom) => interativeRoom, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  interativeRoomParticipations: InterativeRoom[];

  // Chats com professores

  @OneToMany(() => StudTeachChat, (studTeachChat) => studTeachChat.student, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  studTeachChats: StudTeachChat[];

  // Mensagens de chats com professores

  @OneToMany(
    () => StudTeachMessage,
    (studTeachMessage) => studTeachMessage.student,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  studTeachMessages: StudTeachMessage[];

  // Chats com outros alunos criados pelo aluno

  @OneToMany(() => StudStudChat, (studStudChat) => studStudChat.studentOne, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  studStudChatsOne: StudStudChat[];

  // Chats com outros alunos criados por outros alunos

  @OneToMany(() => StudStudChat, (studStudChat) => studStudChat.studentTwo, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  studStudChatsTwo: StudStudChat[];

  // Mensagens de chats com outros alunos

  @OneToMany(
    () => StudStudMessage,
    (studStudMessage) => studStudMessage.student,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  studStudMessages: StudStudMessage[];
}
