import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./Player";
import { Sport } from "./Sport";

@Entity()

export class Position extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @ManyToOne(() => Sport, (sport) => sport.positions)
    sport: Sport

    @OneToMany(() => Player, (player) => player.position)
    player: Player[]
}