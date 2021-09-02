import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';

import Attachment from '../../Attachment/Entity';
import Question from '../../Question/Entity';
import Subject from '../../Subject/Entity';

@Entity('content')
export default class Content {
  
  constructor() {
    if (!this.id) this.id = uuid();
  }

  @PrimaryColumn({ unique: true })
  readonly id: string;

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

  @ManyToOne(() => Subject, subject => subject.contents)
  subject: Subject;
  
  @OneToMany(() => Attachment, attachment => attachment.content)
  attachments: Attachment[];

  @OneToMany(() => Question, question => question.content)
  questions: Question[];

}