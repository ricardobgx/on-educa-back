import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question";

@Entity()
export class Alternative {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  index: number;

  @ManyToOne(type => Question, question => question.alternatives, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  question: Question;
}