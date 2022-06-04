import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sport } from "./Sport";

@Entity()
export class SportGeneric extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @OneToMany(() => Sport, (sport) => sport.sportGeneric)
    sports: Sport[]
  
}