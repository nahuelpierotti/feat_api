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

    @Column({
        nullable: true,
    })
    min_age: number;

    @Column({
        nullable: true,
    })
    max_age: number;

    @Column()
    nickname: string;

    @Column({
        nullable: true,
    })
    notifications: boolean

    @Column({
        nullable: true,
    })
    willing_distance: number

    @Column({
        nullable: true,
    })
    photo_url: string

    @OneToOne(() => User)
    @JoinColumn()
    user: String;

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