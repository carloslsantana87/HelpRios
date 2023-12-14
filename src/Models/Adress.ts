import "reflect-metadata"
import { Client } from './Client';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Client_Systems } from './Client_systems';


@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    cep: string

    @Column({ type: "varchar" })
    logradouro: string

    @Column({ type: "int" })
    numero: number

    @Column({ type: "varchar" })
    complemento: string

    @Column({ type: "varchar" })
    bairro: string

    @Column({ type: "varchar" })
    cidade: string

    @Column({ type: "varchar" })
    uf: string

    @ManyToOne(() => Client, (clientAdress) => clientAdress.addressCli)
    clientAdress: Client

    @ManyToOne(() => Client, (client_Systems) => client_Systems.addressCli)
    client_Systems: Client
}