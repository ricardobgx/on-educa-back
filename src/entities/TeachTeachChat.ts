import { Entity, ManyToOne, OneToMany } from "typeorm";
import { Chat } from "./Chat";
import { Teacher } from "./Teacher";
import { TeachTeachMessage } from "./TeachTeachMessage";

@Entity()
export class TeachTeachChat extends Chat {
  @ManyToOne(type => Teacher, teacher => teacher.teachTeachChatsOne, {
    onUpdate: 'CASCADE',
  })
  teacherOne: Teacher;

  @ManyToOne(type => Teacher, teacher => teacher.teachTeachChatsTwo, {
    onUpdate: 'CASCADE',
  })
  teacherTwo: Teacher;

  @OneToMany(type => TeachTeachMessage, teachTeachMessage => teachTeachMessage.chat, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  messages: TeachTeachMessage[];
}