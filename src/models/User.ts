import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Person } from "./Person";
import { UserType } from "./UserType";

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  uid: String;

  @Column()
  email: string;

  @ManyToOne((_) => UserType, (userType) => userType.users)
  userType: UserType;

  @OneToOne(()=>Person)
  person: Person;
}
