import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Image } from './Image';

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
}
