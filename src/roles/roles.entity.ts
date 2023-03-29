import { Users } from 'src/users/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Roles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  slug: string;

  @Column()
  name: string;

  @Column()
  description: string;
  @OneToMany(() => Users, (user) => user.roles)
  user: Users[];
}
