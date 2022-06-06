import { BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Level } from "./Level";
import { Player } from "./Player";
import { Position } from "./Position";
import { Event } from "./Event";
import { SportGeneric } from "./SportGeneric";

@Entity()

export class Sport extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string
  
    @Column({
        nullable: true,
    })
    capacity: number

    @Column({
        nullable: true,
    })
    substitute: number

    @OneToMany(()=>Event, event =>event.sport)
    event: Event;

    @ManyToOne(() => SportGeneric, (sportGeneric) => sportGeneric.sports)
    sportGeneric: SportGeneric
}