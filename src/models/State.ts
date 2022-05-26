import { BaseEntity, Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @OneToMany(()=> Event, event => event.state,{ cascade: ['insert', 'update'] } )
    event: Event    

}