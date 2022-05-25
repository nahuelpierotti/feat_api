import { BaseEntity, Column, Entity,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    /*
    @ManyToMany(() => State, state => state.event)
    @JoinTable({
        name: 'event_state',
        joinColumn:{
            name: 'eventId',
        },
        inverseJoinColumn:{
            name: 'stateId'
        },
    })
    state: State[];*/

    @ManyToOne(() => State)
    @JoinColumn()
    state: State[];
    
    @ManyToOne(() => Sport)
    @JoinColumn()
    sport: Sport[];

    @ManyToOne(() => Periodicity)
    @JoinColumn()
    periodicity: Periodicity[];

    @OneToMany(() => EventApply, eventApply=> eventApply.event)
    eventApply: EventApply;

    @OneToOne(() => PlayerList)
    playerList: PlayerList;
}