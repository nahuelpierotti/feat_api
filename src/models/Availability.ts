import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Day } from "./Day";
import { Person } from "./Person";

@Entity()

export class Availability extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    start_time: number

    @Column()
    end_time: number
    
    @ManyToOne(() => Person, (person) => person.availability)
    person: Person

    @ManyToMany(() => Day)
    @JoinTable({
        name: 'day_availability',
        joinColumn:{
            name: 'availabilityId',
        },
        inverseJoinColumn:{
            name: 'dayId'
        },
    })
    day: Day[]
}