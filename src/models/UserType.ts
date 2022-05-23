import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { User } from "./User";
@Entity()
export class UserType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @OneToMany((_) => User, (user) => user.userType)
  users: User[];
}
