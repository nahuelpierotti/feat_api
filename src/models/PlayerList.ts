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
    state: number
    
    @OneToOne(() => Event)
    @JoinColumn()
    event: number

    @ManyToOne(() => Player, (player) => player.playerList)
    player: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: String
}