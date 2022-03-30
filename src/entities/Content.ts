import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Doubt } from './Doubt';
import { Question } from './Question';
import { Unity } from './Unity';

@Entity()
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  video: string;

  @Column()
  index: number;

  // @OneToMany(() => Attachment, (attachment) => attachment.content, {
  //   onUpdate: 'CASCADE',
  //   onDelete: 'CASCADE',
  // })
  // attachments: Attachment[];

  @OneToMany(() => Question, (question) => question.content, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  questions: Question[];

  @OneToMany(() => Doubt, (doubt) => doubt.content, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  doubts: Doubt[];

  // @ManyToMany(() => ContentReview, (contentReview) => contentReview.contents, {
  //   onUpdate: 'CASCADE',
  //   onDelete: 'CASCADE',
  // })
  // contentReviews: ContentReview[];

  @ManyToOne(() => Unity, (unity) => unity.contents, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  unity: Unity;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;
}
