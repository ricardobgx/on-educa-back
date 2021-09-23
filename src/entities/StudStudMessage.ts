import { Entity, ManyToOne } from "typeorm";
import { Message } from "./Message";
import { Student } from "./Student";
import { StudStudChat } from "./StudStudChat";

@Entity()
export class StudStudMessage extends Message {
  @ManyToOne(type => Student, student => student.studStudMessages, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  student: Student;

  @ManyToOne(type => StudStudChat, studStudChat => studStudChat.messages, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  chat: StudStudChat;
}