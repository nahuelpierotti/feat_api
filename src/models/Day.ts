import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Availability } from "./Availability";

@Entity()

export class Day extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;
    
    @OneToMany(() => Availability, (availability) => availability.day)
    availability: Availability[]
}