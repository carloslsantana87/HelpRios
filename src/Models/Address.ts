import { CharacterEncoding } from "crypto"
import "reflect-metadata"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}