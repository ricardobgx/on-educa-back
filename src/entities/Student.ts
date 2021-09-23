import { Column, Entity, JoinColumn, ManyToMany, OneToMany } from "typeorm";
import { ContentReview } from "./ContentReview";
import { Doubt } from "./Doubt";
import { Duel } from "./Duel";
import { InterativeRoom } from "./InterativeRoom";
import { StudStudChat } from "./StudStudChat";
import { StudStudMessage } from "./StudStudMessage";
import { StudTeachChat } from "./StudTeachChat";
import { StudTeachMessage } from "./StudTeachMessage";
import { User } from "./User";

@Entity()
export class Student extends User {
  // Serie escolar

  @Column()
  schoolGrade: number;

  // Duvidas

  @OneToMany(type => Doubt, doubt => doubt.student, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  doubts: Doubt[];

  // Revisoes de conteudo

  @OneToMany(type => ContentReview, contentReview => contentReview.student, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  contentReviews: ContentReview[];

  // Duelos criados

  @OneToMany(type => Duel, duel => duel.student, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  duels: Duel[];

  // Duelos participados

  @ManyToMany(type => Duel, duel => duel.students, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  duelParticipations: Duel[];

  // Sala interativas participadas

  @ManyToMany(type => InterativeRoom, interativeRoom => interativeRoom, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  interativeRoomParticipations: InterativeRoom[];

  // Chats com professores

  @OneToMany(type => StudTeachChat, studTeachChat => studTeachChat.student, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  studTeachChats: StudTeachChat[];

  // Mensagens de chats com professores

  @OneToMany(type => StudTeachMessage, studTeachMessage => studTeachMessage.student, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  studTeachMessages: StudTeachMessage[];

  // Chats com outros alunos criados pelo aluno

  @OneToMany(type => StudStudChat, studStudChat => studStudChat.studentOne, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  studStudChatsOne: StudStudChat[];

  // Chats com outros alunos criados por outros alunos

  @OneToMany(type => StudStudChat, studStudChat => studStudChat.studentTwo, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  studStudChatsTwo: StudStudChat[];

  // Mensagens de chats com outros alunos

  @OneToMany(type => StudStudMessage, studStudMessage => studStudMessage.student, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  studStudMessages: StudStudMessage[];
}