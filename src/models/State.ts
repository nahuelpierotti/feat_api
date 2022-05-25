import { BaseEntity, Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventApply } from "./EventApply";
import { Event } from "./Event";

@Entity()

export class State extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @OneToOne(() => EventApply)
    eventApply: EventApply;

    @ManyToMany(()=> Event, event => event.state)
    event: Event    

}