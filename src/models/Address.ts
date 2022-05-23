import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./Person";

@Entity()

export class Address extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    alias: string

    @Column()
    street: string

    @Column()
    number: string

    @Column()
    town: string

    @Column()
    zip_code: string

    @Column()
    latitude: string

    @Column()
    logitude: string

    @ManyToOne(() => Person, (person) => person.addresses)
    person: Person
}