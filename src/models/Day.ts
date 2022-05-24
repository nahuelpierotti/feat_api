import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Availability } from "./Availability";

@Entity()

export class Day extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;
    
}