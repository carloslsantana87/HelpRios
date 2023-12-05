import { CharacterEncoding } from "crypto"
import "reflect-metadata"
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Address } from "./Address"; // Importando a classe Address

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    tipo: string

    @Column({ type: "bigint" })
    cpf: number

    @Column({ type: "bigint" })
    cnpj: number

    @Column({ type: "varchar" })
    nome_razao: string
    
    @OneToOne(type => Address, { //: Cria um relacionamento OneToOne com a classe Address.
        cascade: true, // Aqui o endereço é salvo junto com o cliente
        eager: true // Aqui o endereço é carregado automaticamente ao carregar o cliente
    })
    @JoinColumn() // Utiliza a coluna endereco para armazenar a instância da classe Address
    endereco: Address

    @Column({ type: "varchar" })
    nome_responsavel: string

    @Column({ type: "varchar" })
    fone_responsavel: string

    @Column({ type: "varchar" })
    nome_contato_1: string

    @Column({ type: "varchar" })
    fone_contato_1: string

    @Column({ type: "varchar" })
    nome_contato_2: string

    @Column({ type: "varchar" })
    fone_contato_2: string
}
