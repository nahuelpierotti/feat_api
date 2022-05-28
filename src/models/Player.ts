import { BaseEntity, Column, Entity,JoinColumn,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryGeneratedColumn } from "typeorm";
import { Level } from "./Level";
import { Person } from "./Person";
import { PlayerList } from "./PlayerList";
import { Position } from "./Position";
import { Sport } from "./Sport";
import { Valuation } from "./Valuation";


@Entity()
export class Player extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    abilities: string

    @Column()
    notifications: boolean

    @ManyToOne(() => Person)
    @JoinColumn({name: 'personId'})
    person: number;

    @ManyToOne(() => Sport)
    @JoinColumn({name: 'sportId'})
    sport: number;

    @ManyToOne(() => Position)
    @JoinColumn({name: 'positiontId'})
    position: number;

    @ManyToOne(() => Level)
    @JoinColumn({name: 'levelId'})
    level: number;

    @ManyToOne(() => Valuation)
    @JoinColumn({name: 'valuationId'})
    valuation: number;
    
    @OneToMany(() => PlayerList, (playerList) => playerList.player)
    playerList: PlayerList[]

}