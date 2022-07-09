import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./Person";

@Entity()

export class Address extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    alias: string

    @Column({nullable: true})
    street: string

    @Column({nullable: true})
    number: string

    @Column({nullable: true})
    town: string

    @Column({nullable: true})
    zip_code: string

    @Column()
    latitude: string

    @Column()
    longitude: string

    @ManyToOne(() => Person, (person) => person.addresses)
    person: number
}