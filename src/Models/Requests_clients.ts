import { CharacterEncoding } from "crypto"
import "reflect-metadata"
import { Request_items } from "./Request_items"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Requests_clients {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "int" })
    id_client:  number

    @Column({ type: "datetime" })
    data_abertura: Date

    @OneToMany(() => Request_items, (items) => items.Requests_clients)
    items: Request_items[]


}
