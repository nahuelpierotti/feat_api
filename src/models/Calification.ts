import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./Player";
import { Event } from "./Event";

@Entity()

export class Calification extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
    })
    observation: string;
    
    @Column()
    liked: boolean;

    @Column()
    qualifier: number

    @ManyToOne(() => Event)
    @JoinColumn()
    event: number

    @ManyToOne(() => Player)
    @JoinColumn()
    player: number
}