import { BaseEntity, Entity,JoinColumn,ManyToOne,OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./Player";
import { Event } from "./Event";
import { State } from "./State";

@Entity()
export class PlayerList extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(() => State)
    @JoinColumn()
    state: State
    
    @OneToOne(() => Event)
    @JoinColumn()
    Event: Event

    @ManyToOne(() => Player, (player) => player.playerList)
    player: Player
}