import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Content } from "./Content";

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(type => Content, content => content.attachments, {
    onUpdate: 'CASCADE',
  })
  content: Content;
}