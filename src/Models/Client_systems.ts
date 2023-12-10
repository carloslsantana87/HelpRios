import "reflect-metadata"
import { Client } from './Client';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Client_Systems {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    nome:  string

    @Column({ type: "varchar" })
    descricao: string

    @ManyToOne(() => Client, (client) => client.system)
    client: Client

}
