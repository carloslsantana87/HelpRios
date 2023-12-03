import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../Models/User"
import { Client } from "../Models/Client"
import { Requests_clients } from "../Models/Requests_clients"
import { Request_items } from "../Models/Request_items"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234567",
    database: "helprios",
    synchronize: true,
    logging: true,
    entities: [User, Client, Requests_clients, Request_items],
    migrations: [],
    subscribers: [],
})

