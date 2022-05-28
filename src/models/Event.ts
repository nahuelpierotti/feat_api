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

    @ManyToOne(() => State, state=> state.event,{ cascade: ['insert', 'update'] })
    @JoinColumn({name: 'stateId'})
    state: number;
    
    @ManyToOne(() => Sport)
    @JoinColumn({name: 'sportId'})
    sport: number;

    @ManyToOne(() => Periodicity)
    @JoinColumn({name: 'periodicityId'})
    periodicity: number;

    @OneToMany(() => EventApply, eventApply=> eventApply.event, { cascade: ['insert', 'update'] })
    eventApply: EventApply;

    @OneToOne(() => PlayerList)
    playerList: PlayerList;

    @ManyToOne(() => Player, (player) => player.events)
    @JoinColumn({name: 'organizerId'})
    organizer: number;

}