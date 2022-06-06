import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./Player";
import { Sport } from "./Sport";
import { SportGeneric } from "./SportGeneric";

@Entity()

export class Position extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @ManyToOne(() => SportGeneric)
    @JoinColumn({name: 'sportGenericId'})
    sport: number;

    @OneToMany(() => Player, (player) => player.position)
    player: Player[]
}