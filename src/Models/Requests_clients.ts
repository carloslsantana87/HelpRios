import { CharacterEncoding } from "crypto"
import "reflect-metadata"
import { Systems } from "./Systems"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Requests_clients {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "int" })
    id_client:  number

    @Column({ type: "datetime" })
    data_abertura: Date

    @OneToMany(() => Systems, (systems) => Systems.Requests_clients)
    photos: Systems[]


}
