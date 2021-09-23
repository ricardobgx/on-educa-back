import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  createdAt: Date;
}