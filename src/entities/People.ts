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
import AchievementProgress from './AchievementProgress';
import { Chat } from './Chat';
import { DoubtComment } from './DoubtComment';
import { Image } from './Image';
import League from './League';
import { Message } from './Message';
import MissionProgress from './MissionProgress';

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

  // Mensagens enviadas
  @OneToMany(() => Message, (messagesSent) => messagesSent.sender, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  messagesSent: Message[];

  // Comentarios em duvidas
  @ManyToMany(() => DoubtComment, (doubtsComments) => doubtsComments.people, {
    onUpdate: 'CASCADE',
  })
  doubtsComments: DoubtComment[];

  @OneToMany(
    () => AchievementProgress,
    (achievementProgress) => achievementProgress.people,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  achievementsProgress: AchievementProgress[];

  @OneToMany(
    () => MissionProgress,
    (missionProgress) => missionProgress.people,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )
  missionsProgress: MissionProgress[];

  @ManyToOne(() => League, (league) => league.peoples, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  league: League;
}
