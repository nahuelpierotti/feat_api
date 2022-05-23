import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./Event";

@Entity()

export class Periodicity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @OneToOne(()=>Event)
    event: Event;
}