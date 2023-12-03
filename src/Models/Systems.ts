import { CharacterEncoding } from "crypto"
import "reflect-metadata"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Systems {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    firstName:  string

    @Column({ type: "varchar" })
    lastName: string

    @Column({ type: "int" })
    age: number

}
