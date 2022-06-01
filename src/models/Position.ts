import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./Player";
import { Sport } from "./Sport";

@Entity()

export class Position extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @ManyToOne(() => Sport)
    @JoinColumn({name: 'sportId'})
    sport: number;

    @OneToMany(() => Player, (player) => player.position)
    player: Player[]
}