import { Entity, ManyToOne } from "typeorm";
import { Message } from "./Message";
import { Teacher } from "./Teacher";
import { TeachTeachChat } from "./TeachTeachChat";

@Entity()
export class TeachTeachMessage extends Message {
  @ManyToOne(type => Teacher, teacher => teacher.teachTeachMessages, {
    onUpdate: 'CASCADE',
  })
  teacher: Teacher;

  @ManyToOne(type => TeachTeachChat, teachTeachChat => teachTeachChat.messages, {
    onUpdate: 'CASCADE',
  })
  chat: TeachTeachChat;
}