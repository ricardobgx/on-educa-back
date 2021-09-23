import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attachment } from "./Attachment";
import { ContentReview } from "./ContentReview";
import { Doubt } from "./Doubt";
import { Question } from "./Question";
import { Subject } from "./Subject";
import { Teacher } from "./Teacher";

@Entity()
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  video: string;

  @Column()
  schoolGrade: number;

  @Column()
  index: number;

  @OneToMany(type => Attachment, attachment => attachment.content, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  attachments: Attachment[];

  @OneToMany(type => Question, question => question.content, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  questions: Question[];

  @OneToMany(type => Doubt, doubt => doubt.content, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  doubts: Doubt[];

  @ManyToOne(type => Subject, subject => subject.contents, {
    onUpdate: 'CASCADE',
  })
  subject: Subject;

  @ManyToOne(type => Teacher, teacher => teacher.contents, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  teacher: Teacher;

  @ManyToMany(type => ContentReview, contentReview => contentReview.contents, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  contentReviews: ContentReview[];
}