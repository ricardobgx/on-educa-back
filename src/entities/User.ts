import { hash } from "bcryptjs";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 8);
  }

  @PrimaryColumn()
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