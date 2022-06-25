import { BaseEntity, Column, Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./Player";
import { Event } from "./Event";
import { Calification } from "./Calification";

@Entity()
export class PlayerEventCalification extends BaseEntity{
@PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => Player)
    @JoinColumn()
    player: Player[]
    
    @ManyToOne(() => Event)
    @JoinColumn()
    event: Event[]

    @ManyToOne(() => Calification)
    @JoinColumn()
    calification: Calification[]

    @Column()
    detail: String

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: String
}