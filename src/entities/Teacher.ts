import { Entity, ManyToMany, OneToMany } from "typeorm";
import { Content } from "./Content";
import { InterativeRoom } from "./InterativeRoom";
import { StudTeachChat } from "./StudTeachChat";
import { Subject } from "./Subject";
import { TeachStudMessage } from "./TeachStudMessage";
import { TeachTeachChat } from "./TeachTeachChat";
import { TeachTeachMessage } from "./TeachTeachMessage";
import { User } from "./User";

@Entity()
export class Teacher extends User {
  // Disciplinas

  @ManyToMany(type => Subject, subject => subject.teachers, {
    onUpdate: 'CASCADE',
  })
  subjects: Subject[];

  // Salas interativas criadas

  @OneToMany(type => InterativeRoom, interativeRoom => interativeRoom.teacher, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  interativeRooms: InterativeRoom[];

  // Salas interativas participadas

  @ManyToMany(type => InterativeRoom, interativeRoom => interativeRoom.teachers, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  interativeRoomParticipations: InterativeRoom[];

  // Conteudos criados

  @OneToMany(type => Content, content => content.teacher, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  contents: Content[];

  // Chats com alunos

  @OneToMany(type => StudTeachChat, studTeachChat => studTeachChat.teacher, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  studTeachChats: StudTeachChat[];

  // Mensagens de chats com alunos

  @OneToMany(type => TeachStudMessage, teachStudMessage => teachStudMessage.teacher, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  teachStudMessages: TeachStudMessage[];

  // Chats com outros professores criados pelo professor

  @OneToMany(type => TeachTeachChat, teachTeachChat => teachTeachChat.teacherOne, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  teachTeachChatsOne: TeachTeachChat[];

  // Chats com outros professores criados pelos outros professores

  @OneToMany(type => TeachTeachChat, teachTeachChat => teachTeachChat.teacherTwo, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  teachTeachChatsTwo: TeachTeachChat[];

  // Mensagens de chats com professores criados por outros professores

  @OneToMany(type => TeachTeachMessage, teachTeachMessage => teachTeachMessage.teacher, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  teachTeachMessages: TeachTeachMessage[];
}