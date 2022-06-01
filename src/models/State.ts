import { BaseEntity, Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventApply } from "./EventApply";
import { Event } from "./Event";
import { EventSuggestion } from "./EventSuggestion";

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

    @OneToMany(() => EventSuggestion, eventSuggestion=> eventSuggestion.state, { cascade: ['insert', 'update'] })
    eventSuggestion: EventSuggestion;

}