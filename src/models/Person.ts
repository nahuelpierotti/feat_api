import { BaseEntity, Column, Entity,JoinColumn,OneToMany,OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./Address";
import { Availability } from "./Availability";
import { Player } from "./Player";
import { User } from "./User";
import { Event } from "./Event";
import { EventSuggestion } from "./EventSuggestion";

@Entity()
export class Person extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lastname: string;

    @Column()
    names: string;

    @Column()
    birth_date: Date;

    @Column()
    sex: string;

    @Column()
    min_age: number;

    @Column()
    max_age: number;

    @Column()
    nickname: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToMany(() => Player, (player) => player.person)
    player: Player[]

    @OneToMany(() => Availability, (availability) => availability.person)
    availability: Availability[]

    @OneToMany(() => Address, (address) => address.person)
    addresses: Address[]

    @OneToMany(() => Event, (event) => event.organizer)
    events: Event[]

    @OneToMany(() => EventSuggestion, eventSuggestion=> eventSuggestion.person, { cascade: ['insert', 'update'] })
    eventSuggestion: EventSuggestion;
}