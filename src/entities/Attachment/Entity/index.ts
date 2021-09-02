import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import Content from '../../Content/Entity';

@Entity('attachment')
export default class Attachment {
  
  constructor() {
    if (!this.id) this.id = uuid();
  }

  @PrimaryColumn({ unique: true })
  readonly id: string;

  @Column()
  name: string;

  @Column()
  link: string;

  @ManyToOne(() => Content, content => content.attachments)
  content: Content;

}