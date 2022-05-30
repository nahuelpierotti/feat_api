import { BaseEntity, Column, Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./Player";
import { Event } from "./Event";
import { State } from "./State";
import { Person } from "./Person";

@Entity()
export class EventSuggestion extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => State)
    @JoinColumn()
    state: State[]
    
    @ManyToOne(() => Event)
    @JoinColumn()
    event: Event[]

    @ManyToOne(() => Person)
    @JoinColumn()
    person: Person[]

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: String
}