import { BaseEntity, Column, Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./Player";
import { Event } from "./Event";
import { State } from "./State";

@Entity()
export class PlayerSuggestion extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => State)
    @JoinColumn()
    state: State[]
    
    @ManyToOne(() => Event)
    @JoinColumn()
    event: Event[]

    @ManyToOne(() => Player)
    @JoinColumn()
    player: Player[]

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: String
}