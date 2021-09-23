import { Entity, ManyToOne } from "typeorm";
import { Message } from "./Message";
import { StudTeachChat } from "./StudTeachChat";
import { Teacher } from "./Teacher";

@Entity()
export class TeachStudMessage extends Message {
  @ManyToOne(type => StudTeachChat, studTeachChat => studTeachChat.teacherMessages, {
    onUpdate: 'CASCADE',
  })
  chat: StudTeachChat;

  @ManyToOne(type => Teacher, teacher => teacher.teachStudMessages, {
    onUpdate: 'CASCADE',
  })
  teacher: Teacher;
}