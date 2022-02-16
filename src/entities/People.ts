import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from './Chat';
import { Image } from './Image';
import { Message } from './Message';

@Entity()
export class People {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  name: string;

  @Column()
  password: string;

  @Column()
  isOnline: boolean;

  @Column({ nullable: false })
  isStudent: boolean;

  @Column()
  dailyGoal: number;

  @ManyToOne(() => Image, {
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  profilePicture: Image;

  @ManyToMany(() => People, (people) => people.friends, {
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  friends: People[];

  @OneToMany(() => Chat, (chatsCreated) => chatsCreated.chatCreator, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  chatsCreated: Chat[];

  @OneToMany(
    () => Chat,
    (chatsParticipated) => chatsParticipated.chatParticipant,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  chatsParticipated: Chat[];

  @OneToMany(() => Message, (messagesSent) => messagesSent.sender, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  messagesSent: Message[];
}
