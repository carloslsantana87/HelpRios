//import * as express from "express"
import express from 'express'
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "../src/db/data-source"
import { Routes } from "../src/Routes/techniciansroutes"
import { Technicians } from "../src/Models/technicians"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // setup express app here
    // ...

    // start express server
    app.listen(8080)

    // insert new users for test
    await AppDataSource.manager.save(
        AppDataSource.manager.create(Technicians, {
            nome:'CARLOS JOSE',
            cpf: 2187324494,
            cep: 50770500,
            logradouro: "RUA FRANCISCO PORFIRIO",
            numero: 175,   
            complemento: "APT 305", 
            bairro: "AFOGADOS",     
            cidade: "RECIFE", 
            uf: "UF",     
            fone_contato: '81-984030906'

        })
    )

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))
