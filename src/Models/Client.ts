import { CharacterEncoding } from "crypto"
import "reflect-metadata"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    tipo:  string

    @Column({ type: "bigInt" })
    cpf:  number

    @Column({ type: "bigInt" })
    cnpj:  number

    @Column({ type: "varchar" })
    nome_razao:  string
    
    @Column({ type: "Int" })
    cep:  number

    @Column({ type: "varchar" })
    logradouro:  string

    @Column({ type: "Int" })
    numero:  number

    @Column({ type: "varchar" })
    complemento:  string

    @Column({ type: "varchar" })
    bairro:  string

    @Column({ type: "varchar" })
    cidade:  string

    @Column({ type: "varchar" })
    uf:  string

    @Column({ type: "varchar" })
    nome_responsavel:  string

    @Column({ type: "varchar" })
    fone_responsavel:  string

    @Column({ type: "varchar" })
    nome_contato_1:  string

    @Column({ type: "varchar" })
    fone_contato_1:  string

    @Column({ type: "varchar" })
    nome_contato_2:  string

    @Column({ type: "varchar" })
    fone_contato_2:  string

}
