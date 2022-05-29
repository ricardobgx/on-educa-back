import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { People } from './People';

@Entity()
export default class League {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: number;

  @Column()
  level: number;

  @Column()
  minScore: number;

  @Column()
  requiredScore: number;

  @OneToMany(() => People, (people) => people.league, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  peoples: People[];
}
