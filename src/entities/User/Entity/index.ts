import { Entity, PrimaryColumn, Column, BeforeInsert, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { hash } from 'bcryptjs';

@Entity('user')
export default class User {
  
  constructor() {
    if (!this.id) this.id = uuid();
  }

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 8);
  }

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ nullable: false })
  name: string;

  @PrimaryColumn()
  email: string;

  @Column({ nullable: false })
  photo: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  isOnline: boolean;

}