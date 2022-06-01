import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Day } from "./Day";
import { Person } from "./Person";

@Entity()

export class Availability extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number
    
    @Column('time', {name: 'start_time'})
    start_time: Date;

    @Column('time', {name: 'end_time'})
    end_time: Date;
    
    @ManyToOne(() => Person)
    @JoinColumn({name: 'personId'})
    person: number;

    @ManyToOne(() => Day)
    @JoinColumn({name: 'personID'})
    day: number;
}