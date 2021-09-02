import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';

import Question from '../../Question/Entity';

@Entity('alternative')
export default class Alternative {
  
  constructor() {
    if (!this.id) this.id = uuid();
  }

  @PrimaryColumn({ unique: true })
  readonly id: string;

  @Column()
  description: string;

  @Column()
  index: string;

  @ManyToOne(() => Question, question => question.alternatives)
  question: Question;

}