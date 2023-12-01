import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234567",
    database: "helprios",
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
})

