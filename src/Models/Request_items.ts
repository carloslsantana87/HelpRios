import { CharacterEncoding } from "crypto"
import "reflect-metadata"
import { Requests_clients } from "./Requests_clients"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Request_items {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "int" })
    id_system:  number

    @Column({ type: "varchar" })
    ocorrencia: string

    @ManyToOne(() => Requests_clients, (clients) => clients.Requests_clients)
    clients: Requests_clients

}
