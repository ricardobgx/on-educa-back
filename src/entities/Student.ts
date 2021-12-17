import { Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
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

@Entity()
export class Student extends User {
  @ManyToOne((type) => SchoolGrade, (schoolGrade) => schoolGrade.students, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  schoolGrade: SchoolGrade;

  // Duvidas

  @OneToMany((type) => Doubt, (doubt) => doubt.student, {
    cascade: true,
  })
  doubts: Doubt[];

  // Revisoes de conteudo

  @OneToMany(
    (type) => ContentReview,
    (contentReview) => contentReview.student,
    {
      cascade: true,
    }
  )
  contentReviews: ContentReview[];

  // Duelos criados

  @OneToMany((type) => Duel, (duel) => duel.owner, {
    cascade: true,
  })
  duels: Duel[];

  // Duelos participados

  @ManyToMany(
    (type) => DuelTeamParticipation,
    (duelTeamsParticipations) => duelTeamsParticipations.student,
    {
      cascade: true,
    }
  )
  duelTeamsParticipations: DuelTeamParticipation[];

  // Sala interativas participadas

  @ManyToMany((type) => InterativeRoom, (interativeRoom) => interativeRoom, {
    cascade: true,
  })
  interativeRoomParticipations: InterativeRoom[];

  // Chats com professores

  @OneToMany(
    (type) => StudTeachChat,
    (studTeachChat) => studTeachChat.student,
    {
      cascade: true,
    }
  )
  studTeachChats: StudTeachChat[];

  // Mensagens de chats com professores

  @OneToMany(
    (type) => StudTeachMessage,
    (studTeachMessage) => studTeachMessage.student,
    {
      cascade: true,
    }
  )
  studTeachMessages: StudTeachMessage[];

  // Chats com outros alunos criados pelo aluno

  @OneToMany(
    (type) => StudStudChat,
    (studStudChat) => studStudChat.studentOne,
    {
      cascade: true,
    }
  )
  studStudChatsOne: StudStudChat[];

  // Chats com outros alunos criados por outros alunos

  @OneToMany(
    (type) => StudStudChat,
    (studStudChat) => studStudChat.studentTwo,
    {
      cascade: true,
    }
  )
  studStudChatsTwo: StudStudChat[];

  // Mensagens de chats com outros alunos

  @OneToMany(
    (type) => StudStudMessage,
    (studStudMessage) => studStudMessage.student,
    {
      cascade: true,
    }
  )
  studStudMessages: StudStudMessage[];
}
