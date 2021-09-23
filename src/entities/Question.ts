import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Alternative } from "./Alternative";
import { Content } from "./Content";
import { Duel } from "./Duel";
import { InterativeRoom } from "./InterativeRoom";

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  difficulty: number;

  @Column()
  index: string;

  @ManyToOne(type => Content, content => content.questions, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  content: Content;

  @OneToMany(type => Alternative, alternative => alternative.question, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  alternatives: Alternative[];

  @ManyToMany(type => Duel, duel => duel.questions, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  duels: Duel[];

  @ManyToMany(type => InterativeRoom, interativeRoom => interativeRoom.questions, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  interativeRooms: InterativeRoom[];
}