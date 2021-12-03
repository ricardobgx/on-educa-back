import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Content } from "./Content";
import { Subject } from "./Subject";

@Entity()
export class Unity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(type => Subject, subject => subject.units, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  subject: Subject;

  @OneToMany(type => Content, contents => contents.unity, {
    onUpdate: 'CASCADE'
  })
  contents: Content[];
}