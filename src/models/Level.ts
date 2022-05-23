import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./Player";
import { Sport } from "./Sport";

@Entity()

export class Level extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @OneToMany(() => Player, (player) => player.level)
    player: Player[]

    @ManyToOne(() => Sport, (sport) => sport.level)
    sport: Sport

}