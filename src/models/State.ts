import { BaseEntity, Column, Entity,ManyToOne, OneToMany,PrimaryGeneratedColumn } from "typeorm";
import { EventApply } from "./EventApply";
import { Event } from "./Event";
import { EventSuggestion } from "./EventSuggestion";
import { PlayerList } from "./PlayerList";

@Entity()

export class State extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    stateGeneric: number

    @OneToMany(() => EventApply, eventApply => eventApply.state,{ cascade: ['insert', 'update'] })
    eventApply: EventApply;

    @OneToMany(()=> Event, event => event.state,{ cascade: ['insert', 'update'] } )
    event: Event    

    @OneToMany(() => EventSuggestion, eventSuggestion=> eventSuggestion.state, { cascade: ['insert', 'update'] })
    eventSuggestion: EventSuggestion;

    @OneToMany(() => PlayerList, playerList => playerList.state,{ cascade: ['insert','update']})
    playerList: PlayerList;

}