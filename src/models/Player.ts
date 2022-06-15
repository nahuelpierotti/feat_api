import { BaseEntity, Column, Entity,JoinColumn,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryGeneratedColumn } from "typeorm";
import { EventSuggestion } from "./EventSuggestion";
import { Level } from "./Level";
import { Person } from "./Person";
import { PlayerList } from "./PlayerList";
import { Position } from "./Position";
import { Sport } from "./Sport";
import { SportGeneric } from "./SportGeneric";
import { Valuation } from "./Valuation";


@Entity()
export class Player extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    abilities: string

    @ManyToOne(() => Person)
    @JoinColumn({name: 'personId'})
    person: number;

    @ManyToOne(() => SportGeneric)
    @JoinColumn({name: 'sportGenericId'})
    sport: number;

    @ManyToOne(() => Position,{
        nullable: true,
    })
    @JoinColumn({name: 'positiontId'})
    position: number;

    @ManyToOne(() => Level,{
        nullable: true,
    })
    @JoinColumn({name: 'levelId'})
    level: number;

    @ManyToOne(() => Valuation,{
        nullable: true,
    })
    @JoinColumn({name: 'valuationId'})
    valuation: number;
    
    @OneToMany(() => PlayerList, (playerList) => playerList.player)
    playerList: PlayerList[]

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created: String;
}