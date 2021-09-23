import { Entity, ManyToOne, OneToMany } from "typeorm";
import { Chat } from "./Chat";
import { Student } from "./Student";
import { StudStudMessage } from "./StudStudMessage";

@Entity()
export class StudStudChat extends Chat {
  @ManyToOne(type => Student, student => student.studStudChatsOne, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  studentOne: Student;

  @ManyToOne(type => Student, student => student.studStudChatsTwo, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  studentTwo: Student;

  @OneToMany(type => StudStudMessage, studStudMessage => studStudMessage.chat, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  messages: StudStudMessage[];
}