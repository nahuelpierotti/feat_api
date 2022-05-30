import { BaseEntity, Column, Entity,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryGeneratedColumn } from "typeorm";
import { EventSuggestion } from "./EventSuggestion";
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
    
    @ManyToOne(() => Person, (person) => person.player)
    person: Person

    @ManyToOne(() => Sport, (sport) => sport.player)
    sport: Sport

    @ManyToOne(() => Position, (position) => position.player)
    position: Position

    @ManyToOne(() => Level, (level) => level.player)
    level: Level

    @ManyToOne(() => Valuation, (valuation) => valuation.player)
    valuation: Valuation
    
    @OneToMany(() => PlayerList, (playerList) => playerList.player)
    playerList: PlayerList[]

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created: String
    
}