import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./Player";

@Entity()

export class Valuation extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    order: number;

    @OneToMany(() => Player, (player) => player.valuation)
    player: Player[]

}