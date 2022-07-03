import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Calification extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;
    
    @Column()
    value: number;
}