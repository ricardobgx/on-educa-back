import { hash } from 'bcryptjs';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  name: string;

  @Column()
  profilePicture: string;

  @Column()
  password: string;

  @Column()
  isOnline: boolean;
}
