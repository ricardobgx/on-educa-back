import { hash } from 'bcryptjs';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Image } from './Image';

@Entity()
export class User {
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 8);
  }

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
  userType: string;

  @OneToOne(() => Image, {
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn()
  profilePicture: Image;
}
