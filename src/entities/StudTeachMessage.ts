import { Entity, ManyToOne } from "typeorm";
import { Message } from "./Message";
import { Student } from "./Student";
import { StudTeachChat } from "./StudTeachChat";

@Entity()
export class StudTeachMessage extends Message {
  @ManyToOne(type => StudTeachChat, studTeachChat => studTeachChat.studentMessages, {
    onUpdate: 'CASCADE',
  })
  chat: StudTeachChat;

  @ManyToOne(type => Student, student => student.studTeachChats, {
    onUpdate: 'CASCADE',
  })
  student: Student;
}