import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { People } from './People';

@Entity()
export class FriendRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => People, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  requester: People;

  @ManyToOne(() => People, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  requested: People;
}
