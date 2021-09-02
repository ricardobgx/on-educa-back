import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';

import Alternative from '../../Alternative/Entity';
import Content from '../../Content/Entity';

@Entity('question')
export default class Question {
  
  constructor() {
    if (!this.id) this.id = uuid();
  }

  @PrimaryColumn({ unique: true })
  readonly id: string;

  @Column()
  description: string;

  @Column()
  index: number;

  @Column()
  difficulty: number;

  @ManyToOne(() => Content, content => content.questions)
  content: Content;

  @OneToMany(() => Alternative, alternative => alternative.question)
  alternatives: Alternative[];

}