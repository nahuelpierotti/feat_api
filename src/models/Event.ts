import { BaseEntity, Column, Entity,JoinColumn,OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventApply } from "./EventApply";
import { Periodicity } from "./Periodicity";
import { Player } from "./Player";
import { PlayerList } from "./PlayerList";
import { Sport } from "./Sport";
import { State } from "./State";

@Entity()
export class Event extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name: string

    @Column()
    date: Date

    @Column('time', {name: 'start_time'})
    start_time: Date;

    @Column('time', {name: 'end_time'})
    end_time: Date;

    @Column()
    description: String

    @Column()
    latitude: string

    @Column()
    logitude: string

    @OneToOne(() => State)
    @JoinColumn()
    state: State;
    
    @OneToOne(() => Sport)
    @JoinColumn()
    sport: Sport;

    @OneToOne(() => Periodicity)
    @JoinColumn()
    periodicity: Periodicity;

    @OneToOne(() => Player)
    Event: Event;
   
    @OneToOne(() => EventApply)
    eventApply: EventApply;

    @OneToOne(() => PlayerList)
    playerList: PlayerList;
}