import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./Event";

@Entity()

export class Periodicity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @OneToMany(() => Event, (event) => event.periodicity)
    event: Event[]
}