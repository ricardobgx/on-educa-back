import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './Message';
import { People } from './People';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => People, (chatCreator) => chatCreator.chatsCreated, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  chatCreator: People;

  @ManyToOne(
    () => People,
    (chatParticipant) => chatParticipant.chatsParticipated,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  @JoinColumn()
  chatParticipant: People;

  @OneToMany(() => Message, (messages) => messages.chat, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  messages: Message[];

  @Column({ type: 'timestamptz' })
  createdAt: Date;
}
