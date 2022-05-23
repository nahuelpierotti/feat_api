import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Person } from "./Person";
import { UserType } from "./UserType";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  token: string;

  @Column()
  sessionId: string;

  @ManyToOne((_) => UserType, (userType) => userType.users)
  userType: UserType;

  @OneToOne(()=>Person)
  person: Person;
}
