import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "./Chat";
import { Student } from "./Student";
import { StudTeachMessage } from "./StudTeachMessage";
import { Teacher } from "./Teacher";
import { TeachStudMessage } from "./TeachStudMessage";

@Entity()
export class StudTeachChat extends Chat {
  @ManyToOne(type => Student, student => student.studTeachChats, {
    onUpdate: 'CASCADE',
  })
  student: Student;

  @ManyToOne(type => Teacher, teacher => teacher.studTeachChats, {
    onUpdate: 'CASCADE',
  })
  teacher: Teacher;

  @OneToMany(type => StudTeachMessage, studTeachMessage => studTeachMessage.chat, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  studentMessages: StudTeachMessage[];

  @OneToMany(type => TeachStudMessage, studTeachMessage => studTeachMessage.chat, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  teacherMessages: TeachStudMessage[];
}