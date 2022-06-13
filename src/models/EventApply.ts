import { BaseEntity, Column, Entity,JoinColumn,ManyToOne,OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./Player";
import { Event } from "./Event";
import { State } from "./State";

@Entity()
export class EventApply extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ length: 1 })
    origin: String

    @ManyToOne(() => State)
    @JoinColumn()
    state: number
    
    @ManyToOne(() => Event)
    @JoinColumn()
    event: number

    @ManyToOne(() => Player)
    @JoinColumn()
    player: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: String
}