import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Level } from "./Level";
import { Player } from "./Player";
import { Position } from "./Position";
import { Sport } from "./Sport";

@Entity()
export class SportGeneric extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @OneToMany(() => Sport, (sport) => sport.sportGeneric)
    sports: number

    @OneToMany(() => Level, (level) => level.sport)
    level: Level[]

    @OneToMany(() => Position, (position) => position.sport)
    positions: Position[]

    @OneToMany(() => Player, (player) => player.sport)
    player: number
  
}