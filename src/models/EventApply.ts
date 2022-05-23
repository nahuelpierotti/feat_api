import { BaseEntity, Column, Entity,JoinColumn,OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./Player";
import { Event } from "./Event";
import { State } from "./State";

@Entity()
export class EventApply extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ length: 1 })
    origin: String

    @OneToOne(() => State)
    @JoinColumn()
    state: State
    
    @OneToOne(() => Event)
    @JoinColumn()
    event: Event

    @OneToOne(() => Player)
    @JoinColumn()
    player: Player
}