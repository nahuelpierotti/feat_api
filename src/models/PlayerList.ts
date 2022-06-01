import { BaseEntity, Column, Entity,JoinColumn,ManyToOne,OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./Player";
import { Event } from "./Event";
import { State } from "./State";

@Entity()
export class PlayerList extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ length: 1 })
    origin: String

    @OneToOne(() => State)
    @JoinColumn()
    state: State
    
    @OneToOne(() => Event)
    @JoinColumn()
    Event: Event

    @ManyToOne(() => Player, (player) => player.playerList)
    player: Player

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: String
}