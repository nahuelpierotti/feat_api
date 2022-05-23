import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventApply } from "./EventApply";
import { Event } from "./Event";

@Entity()

export class State extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @OneToOne(() => Event)
    event: Event;

    @OneToOne(() => EventApply)
    eventApply: EventApply;

}